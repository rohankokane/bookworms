import {
  extendTheme,
  theme as base,
  withDefaultColorScheme,
  withDefaultVariant,
} from '@chakra-ui/react'

const colors = {
  brand: {
    50: '#ECEEF8',
    100: '#D9DDF2',
    200: '#B0B7E3',
    300: '#8A95D6',
    400: '#6070C8',
    500: '#3F51B5',
    600: '#324090',
    700: '#26316E',
    800: '#192048',
    900: '#0D1126',
  },
}

export const fonts = {
  heading: `Inter, ${base.fonts?.heading}`,
  body: `Inter, ${base.fonts?.body}`,
}

export const pinkButton = {
  baseStyle: {
    py: '0.5rem',
    minW: 10,
    borderRadius: 'md',
    fontWeight: 'normal',
    _focus: {
      boxShadow: '0 0 0 2px black',
    },
  },
  variants: {
    solidPrimary: {
      height: 'auto',
      px: '1.5rem',
      color: 'gray.100',
      bg: 'pink.700',
      _hover: { bg: 'pink.900' },
      _active: {
        bg: 'pink.900',
        transform: 'scale(0.98)',
        borderColor: 'pink.900',
      },
    },
    outlineSecondary: {
      color: 'gray.800',
      border: '1px solid',
      px: '1.5rem',
      height: 'auto',
      borderColor: 'gray.600',
      _hover: { bg: 'gray.600', color: 'gray.900' },
      _active: {
        bg: 'gray.600',
        transform: 'scale(0.98)',
        borderColor: 'gray.600',
        color: 'gray.900',
      },
    },
    blockPrimary: {
      w: '100%',
      d: 'block',
      height: 'auto',
      px: '1.5rem',
      color: 'gray.100',
      bg: 'pink.700',
      _hover: { bg: 'pink.900' },
      _active: {
        bg: 'pink.900',
        transform: 'scale(0.98)',
        borderColor: 'pink.900',
      },
    },
    blockOutline: {
      d: 'block',
      w: '100%',
      border: '1px solid',
      color: 'pink.800',
      borderColor: 'pink.700',
      borderRadius: 'base',
      _hover: { bg: 'pink.800', color: 'white' },
      _active: {
        bg: 'pink.800',
        color: 'white',
        transform: 'scale(0.98)',
      },
    },
    footerExternalLink: {
      mt: '1rem',
      mb: '1rem',
      as: 'a',
      target: '_blank',
      fontSize: '1.5rem',
      width: '1.5rem',
      height: '1.5rem',
      _hover: {
        color: 'pink.900',
        bg: 'transparent',
      },
      _active: {
        color: 'pink.900',
        bg: 'transparent',
      },
    },
    actionBtnIcon: {
      minW: '1.2rem',
      h: '1.2rem',
      my: '0.5rem',
      color: 'gray.500',
    },
    iconBtn: {
      as: 'span',
      minW: '1.5rem',
      color: 'gray.700',
      height: '1.5rem',
      _hover: {
        color: 'pink.900',
      },
      _active: {
        color: 'pink.900',
      },
    },
  },
}

const brandRing = {
  _focus: {
    ring: 3,
    ringColor: 'brand.200',
  },
}

export const Button = {
  baseStyle: {
    borderRadius: 'md',
    // fontWeight: 'normal',
    ...brandRing,
  },
  variants: {
    footerExternalLink: {
      mt: '1rem',
      mb: '1rem',
      as: 'a',
      target: '_blank',
      fontSize: '1.5rem',
      width: '1.5rem',
      height: '1.5rem',
      _hover: {
        color: 'pink.900',
        bg: 'transparent',
      },
      _active: {
        color: 'pink.900',
        bg: 'transparent',
      },
    },
    actionBtnIcon: {
      minW: '1.2rem',
      h: '1.2rem',
      my: '0.5rem',
      color: 'gray.500',
    },
    iconBtn: {
      as: 'span',
      minW: '1.5rem',
      color: 'gray.700',
      height: '1.5rem',
      _hover: {
        color: 'pink.900',
      },
      _active: {
        color: 'pink.900',
      },
    },
  },
}
const components = {
  Button,
}
export const theme = extendTheme(
  {
    colors,
    fonts,
    components,
  },
  withDefaultColorScheme({
    colorScheme: 'brand',
  }),
  withDefaultVariant({
    variant: 'filled',
    components: ['Input', 'Select'],
  })
)
