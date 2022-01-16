import { IconButton } from '@chakra-ui/react'

function IconBtn({ icon, highLighted, ...props }) {
  return (
    <IconButton
      variant={'postIcon'}
      icon={icon}
      color={highLighted ? 'brand.500' : 'gray.300'}
      {...props}
    />
  )
}

export default IconBtn
