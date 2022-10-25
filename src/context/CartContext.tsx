import { createContext, ReactNode, useContext, useState } from "react";

export interface IProduct {
  id: string;
  name: string;
  imageUrl: string;
  price: number;
  numberPrice: number;
  description: string;
  defaultPriceId: string;
}

interface CartContextData {
  cartItems: IProduct[];
  addToCart: (product: IProduct) => void;
  removeItemFromCart: (productId: string) => void;
  itemAlreadyExists: (productId: string) => boolean;
}

interface CartContextProviderProps {
  children: ReactNode;
}

export const CartContext = createContext({} as CartContextData)

export function useCart() {
  return useContext(CartContext);
}

export function CartContextProvider({ children }: CartContextProviderProps) {
  const [cartItems, setCartItems] = useState<IProduct[]>([]);

  function addToCart(product: IProduct) {
    setCartItems((state) => [...state, product])
  }

  function itemAlreadyExists(productId: string) {
    return cartItems.some((product) => product.id === productId)
  }

  function removeItemFromCart(productId: string) {
    setCartItems(currentItems => {
      return currentItems.filter(item => item.id !== productId)
    })
  }

  return (
    <CartContext.Provider value={{ cartItems, addToCart, itemAlreadyExists, removeItemFromCart }}>
      {children}
    </CartContext.Provider>
  )
}