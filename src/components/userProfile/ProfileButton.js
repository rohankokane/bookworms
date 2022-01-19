import { Button } from '@chakra-ui/react'

function ProfileButton({ isFollowed, isOwnProfile, onClick }) {
  return (
    <>
      <Button onClick={onClick} variant={'outline'} size={'md'} height={'7'}>
        {isOwnProfile ? 'Edit profile' : isFollowed ? 'Following' : 'Follow'}
      </Button>
    </>
  )
}

export default ProfileButton
