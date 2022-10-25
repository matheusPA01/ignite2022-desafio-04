import * as Dialog from '@radix-ui/react-dialog'
import { HeaderContainer } from '../../styles/components/Header'
import Image from "next/future/image"
import { X } from 'phosphor-react'

import logoImg from '../../assets/logo.svg'
import { CartContent } from '../../styles/components/Header'
import CartProduct from '../Cart/index'
import { Handbag } from 'phosphor-react'
import Link from 'next/link'

export default function Header() {
  return (
    <HeaderContainer>
      <Link href={"/"}>
        <Image
          src={logoImg}
          alt=""
        />
      </Link>

      <Dialog.Root>
        <Dialog.Trigger>
          <Handbag size={24} />
        </Dialog.Trigger>

        <Dialog.Portal>
          <CartContent>
            <Dialog.Title>
              Sacola de compras
              <Dialog.Close>
                <X size={24} />
              </Dialog.Close>
            </Dialog.Title>
            <CartProduct />
          </CartContent>
        </Dialog.Portal>
      </Dialog.Root>
    </HeaderContainer>
  )
}