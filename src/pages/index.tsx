import { GetStaticProps } from "next";
import Head from "next/head";
import Image from "next/future/image"
import Link from "next/link";

import { useKeenSlider } from 'keen-slider/react';

import { stripe } from "../lib/stripe";
import Stripe from "stripe";
import { HomeContainer, Product, ProductFooter } from "../styles/pages/home"

import 'keen-slider/keen-slider.min.css';
import { IProduct, useCart } from "../context/CartContext";
import { MouseEvent } from "react";
import { Handbag } from "phosphor-react";

interface HomeProps {
  products: IProduct[];
}

export default function Home({ products }: HomeProps) {
  const [sliderRef] = useKeenSlider({
    slides: {
      perView: 3,
      spacing: 48,
    }
  })

  const { addToCart, itemAlreadyExists } = useCart()

  function handleAddToCart(event: MouseEvent<HTMLButtonElement>, product: IProduct) {
    event.preventDefault();

    if (!itemAlreadyExists(product.id)) {
      addToCart(product)
    } else {
      alert('Não pode adicionar produtos repetidos no carrinho')
    }
  }

  return (
    <>
      <Head>
        <title>Home | Ignite Shop</title>
      </Head>

      <HomeContainer ref={sliderRef} className="keen-slider">
        {products.map(product => {
          return (
            <Link href={`/product/${product.id}`} prefetch={false} key={product.id}>
              <Product className="keen-slider__slide">
                <Image src={product.imageUrl} alt="" width={520} height={480} />
                <ProductFooter>
                  <div>
                    <strong>{product.name}</strong>
                    <span>{product.price}</span>
                  </div>

                  <button
                    onClick={(event) => handleAddToCart(event, product)}
                  >
                    <Handbag size={32} />
                  </button>
                </ProductFooter>

              </Product>
            </Link>
          )
        })}
      </HomeContainer>
    </>
  )
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await stripe.products.list({
    expand: ['data.default_price']
  })

  const products = response.data.map(product => {
    const price = product.default_price as Stripe.Price

    return {
      id: product.id,
      name: product.name,
      imageUrl: product.images[0],
      price: new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL',
      }).format(price.unit_amount / 100),
      numberPrice: price.unit_amount / 100,
      defaultPriceId: price.id,
    }
  })

  return {
    props: {
      products
    },
    revalidate: 60 * 60 * 2, // 2 hours
  }
}