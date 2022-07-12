import { Heading } from '@chakra-ui/react'

function SiteLogo({ size = '2xl', ...props }) {
  return (
    <Heading
      as='h1'
      variant={'logo'}
      textAlign={'center'}
      marginBottom={'0'}
      size={size}
      whiteSpace={'nowrap'}
      {...props}
    >
      Bookworms🐛
    </Heading>
  )
}

export default SiteLogo
