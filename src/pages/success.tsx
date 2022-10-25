import { GetServerSideProps } from "next";
import Image from "next/future/image";
import Head from "next/head";
import Link from "next/link";
import Stripe from "stripe";
import { stripe } from "../lib/stripe";
import { ImageContainer, ImageGroup, SuccessContainer } from "../styles/pages/success";

interface SuccessProps {
  customerName: string;
  products: string[];
}

export default function Success({ customerName, products }: SuccessProps) {
  return (
    <>
      <Head>
        <title>Compra efetuada | Ignite Shop</title>

        <meta name="robots" content="noindex" />
      </Head>

      <SuccessContainer>
        <ImageGroup>
          {products.map((image, i) => {
            return (
              <ImageContainer key={i}>
                <Image src={image} alt="" width={120} height={110} />
              </ImageContainer>
            )
          })}
        </ImageGroup>

        {/* <ImageContainer>
          {products.map((image, i) => {
            return <Image key={i} src={image} alt="" width={120} height={110} />
          })}
        </ImageContainer> */}

        <h1>Compra efetuada!</h1>

        <p>
          Uhuul <strong>{customerName}</strong>, sua compra de <strong>{products.length} camisetas</strong> já está a caminho da sua casa.
        </p>

        <Link href="/">
          Voltar ao catálogo
        </Link>
      </SuccessContainer>
    </>
  )
}

export const getServerSideProps: GetServerSideProps = async ({ query }) => {

  if (!query.session_id) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      }
    }
  }

  const sessionId = String(query.session_id);

  const session = await stripe.checkout.sessions.retrieve(sessionId, {
    expand: ['line_items', 'line_items.data.price.product']
  })

  const customerName = session.customer_details.name;

  const products = session.line_items.data.map(item => {
    const product = item.price.product as Stripe.Product
    return product.images[0]
  })


  return {
    props: {
      customerName,
      products,
    }
  }
}