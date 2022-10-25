import { styled } from "..";
import * as Dialog from '@radix-ui/react-dialog'

export const HeaderContainer = styled('header', {
  padding: '2rem 0',
  width: '100%',
  maxWidth: 1180,
  margin: '0 auto',

  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',

  button: {
    padding: '0.75rem',
    background: '$gray800',
    borderRadius: 6,
    border: 'none',
    cursor: 'pointer',

    display: 'flex',

    svg: {
      color: '$gray400',
    }
  }
})

export const CartContent = styled(Dialog.Content, {
  position: 'fixed',
  background: '$gray800',
  top: 0,
  right: 0,
  width: 480,
  height: '100%',
  padding: '2rem',

  h2: {
    marginBottom: '2rem',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',

    button: {
      background: 'transparent',
      border: 'none',
      color: '$gray300',
      display: 'flex',
    }
  }
})