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

const brandRing = {
  _focus: {
    ring: 3,
    ringColor: 'brand.200',
  },
}

const Button = {
  baseStyle: {
    borderRadius: 'md',
    ...brandRing,
  },
  variants: {
    postIcon: {
      background: 'transparent',
      borderRadius: 'full',
      color: 'gray.300',
      fontSize: '20px',
    },
  },
}
const Heading = {
  variants: {
    logo: {
      fontFamily: `'Sacramento', cursive`,
    },
  },
}
const Container = {
  variants: {
    mainContainer: {
      maxWidth: ['full', '600px', '900px', '900px', '1200px'],
    },
  },
}
const Divider = {
  baseStyle: {
    opacity: '1',
  },
}
const Avatar = {
  sizes: {
    '2xl': {
      size: '10rem',
    },
  },
}

const Input = {
  variants: {
    flushed: {
      field: {
        _focus: {
          borderColor: 'brand.500',
          boxShadow: `0px 1px 0px 0px #3F51B5`,
        },
      },
    },
  },
}

const components = {
  Button,
  Heading,
  Container,
  Divider,
  Avatar,
  Input,
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
