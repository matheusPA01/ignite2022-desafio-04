import { styled } from "..";

export const CartContainer = styled('div', {
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',

  height: '90%',
})

export const CartContent = styled('div', {
  display: 'flex',
  gap: '1.25rem',

  '&+div': {
    marginTop: '1.5rem',
  }
})

export const CartImg = styled('div', {
  background: 'linear-gradient(180deg, #1ea483 0%, #7465d4 100%)',
  borderRadius: 8,
  overflow: 'hidden',
  maxWidth: 102,
  height: 93,

  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
})

export const CartInfo = styled('div', {
  div: {
    lineHeight: '1.6',
    fontSize: '$md',
  },

  button: {
    marginTop: '0.5rem',
    border: 'none',
    background: 'transparent',
    color: '$green500',
    fontWeight: 'bold',
    lineHeight: '1.6',
    fontSize: '$md',
    cursor: 'pointer',

    transition: 'ease-in-out 0.2s',

    '&:hover': {
      color: '$green300',
    },
  }
})

export const CartFooter = styled('footer', {
  marginTop: 'auto',
  lineHeight: '1.6',

  div: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  button: {
    width: '100%',
    padding: '1.25rem 2rem',
    marginTop: '2rem',
    borderRadius: 8,
    fontWeight: 'bold',
    fontSize: '$md',
    background: '$green500',
    color: '$white',
    border: 'none',
    cursor: 'pointer',

    transition: 'ease-in-out 0.2s',

    '&:hover': {
      background: '$green300',
    },
  },

})

export const CartSpan = styled('span', {
  variants: {
    textSize: {
      medium: {
        fontSize: '$md',
      },
    },
  },
})

export const CartStrong = styled('strong', {
  variants: {
    textSize: {
      medium: {
        fontSize: '$md',
      },

      xLarge: {
        fontSize: '$xl',
      }
    }
  }
})