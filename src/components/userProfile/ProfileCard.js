import { Flex, Link } from '@chakra-ui/react'
import ProfileTab from './ProfileTab'
import { Link as RouterLink } from 'react-router-dom'

const ProfileCard = ({ data }) => {
  return (
    <Link
      display={'block'}
      variant={'ghost'}
      as={RouterLink}
      mx={['0', '1']}
      my={4}
      to={`/profile/${data.id}`}
    >
      <Flex
        as={'article'}
        direction={'column'}
        align={'flex-start'}
        justify={'start'}
        w={'full'}
        borderWidth='1px'
        overflow='hidden'
        p={0}
        bg='white'
        paddingX={['0', '4']}
        paddingY={'4'}
      >
        <ProfileTab profileData={data} />
      </Flex>
    </Link>
  )
}

export default ProfileCard
