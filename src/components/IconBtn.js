import { IconButton } from '@chakra-ui/react'

function IconBtn({ icon, highLighted, ...props }) {
  return (
    <IconButton
      variant={'postIcon'}
      icon={icon}
      color={highLighted && 'brand.500'}
      {...props}
    />
  )
}

export default IconBtn
