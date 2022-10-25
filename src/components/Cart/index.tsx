import axios from "axios"
import Image from "next/future/image"
import { useState } from "react"
import { useCart } from "../../context/CartContext"
import {
  CartContainer, CartContent, CartFooter,
  CartImg, CartInfo, CartSpan, CartStrong
} from "../../styles/components/Cart"

export default function CardProduct() {
  const { cartItems, removeItemFromCart } = useCart()
  const [isCreatingCheckoutSession, setIsCreatingCheckoutSession] = useState(false)

  let sumCartPrice = cartItems.reduce((total, cartItem) => {
    const item = cartItems.find(item => item.id === cartItem.id)
    return total + item.numberPrice
  }, 0)

  const priceFormat = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  })


  async function handleCheckout() {
    try {
      setIsCreatingCheckoutSession(true);

      const response = await axios.post('/api/checkout', {
        products: cartItems,
      });

      const { checkoutUrl } = response.data;

      window.location.href = checkoutUrl // para redirecionar para rota externa
    } catch (err) {
      // Conectar com uma ferramente de observabilidade (Datadog / Sentry)

      setIsCreatingCheckoutSession(false);
      alert('Falha ao redirecionar ao checkout!')
    }
  }

  return (
    <CartContainer>
      {cartItems.length === 0 ? 'Sua sacola está vazia :(' : ''}

      {cartItems.map(item => {
        return (
          <CartContent key={item.id}>
            <CartImg>
              <Image src={item.imageUrl} alt="" width={90} height={90} />
            </CartImg>

            <CartInfo>
              <div>
                <p>{item.name}</p>
                <strong>{item.price}</strong>
              </div>
              <button type="button" onClick={() => removeItemFromCart(item.id)}>Remover</button>
            </CartInfo>
          </CartContent>
        )
      })}

      <CartFooter>
        <div>
          <CartSpan>Quantidade</CartSpan>
          <CartSpan textSize={"medium"}>{cartItems.length} {cartItems.length > 1 ? 'itens' : 'item'}</CartSpan>
        </div>

        <div>
          <CartStrong textSize={"medium"}>Valor total</CartStrong>
          <CartStrong textSize={"xLarge"}>{priceFormat.format(sumCartPrice)}</CartStrong>
        </div>

        <button onClick={handleCheckout}>Finalizar compra</button>
      </CartFooter>
    </CartContainer>
  )
}