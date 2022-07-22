import {
  Avatar,
  Box,
  Button,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
  HStack,
  SimpleGrid,
  Spacer,
  Stack,
  Text,
  useBreakpointValue,
  VStack,
  useDisclosure,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  useToast,
} from '@chakra-ui/react'
import { useAuth } from 'hooks/auth-hook'
import { useDispatch } from 'react-redux'
import { followProfile } from 'store/userSlice'
import EditProfile from './EditProfile'
import ProfileButton from './ProfileButton'
import ProfileStat from './ProfileStat'

function ProfileTab({ profileData }) {
  const id = profileData.id
  const { userId, token } = useAuth()
  const dispatch = useDispatch()
  const { isOpen, onOpen, onClose } = useDisclosure()
  const toast = useToast()

  let isOwnProfile = id === userId
  let isFollowed = false
  if (!isOwnProfile) {
    //or check if it's there in user's following

    if (profileData.followers[0]?.id === undefined)
      isFollowed = profileData.followers.some((id) => id === userId)
    else isFollowed = profileData.followers.some((p) => p.id === userId)
  }
  const onProfileButtonClick = () => {
    if (isOwnProfile) {
      //open modal edit form
      onOpen()
    } else {
      //follow

      dispatch(
        followProfile({ userId, profileId: id, isFollowed, token })
      ).catch((action) => {
        toast({
          title: 'Error occurred',
          description: `${action?.error?.message} Please try again`,
          status: 'error',
          position: 'bottom-right',
          duration: 5000,
          isClosable: true,
        })
      })
    }
  }

  const avatarSize = useBreakpointValue({ base: 'xl', md: '2xl' })
  const statsBar = useBreakpointValue({ base: 'grid', md: 'none' })
  const statsMd = useBreakpointValue({ base: 'none', md: 'grid' })
  return (
    <Container p={0} size={{ base: 'full', md: 'container.md' }}>
      <SimpleGrid
        paddingX='1rem'
        style={{ justifyItems: 'center', gridTemplateColumns: '1fr 3fr' }}
      >
        <Avatar
          size={avatarSize}
          name={profileData.fullname}
          src={profileData?.image}
        />
        <HStack
          paddingLeft={'4'}
          marginTop={'4'}
          align={'start'}
          w={'full'}
          spacing={6}
        >
          <VStack
            spacing={'4'}
            align={'start'}
            direction={'column'}
            width={'full'}
          >
            <Stack direction={['column', 'row']} spacing={4}>
              {/* <GridItem colSpan={uidColSpan}> */}
              <Text
                style={{ fontWeight: '300' }}
                fontSize={'xl'}
                fontWeight={'hairline'}
                // mb={2}
              >
                @{profileData.username}
              </Text>
              <ProfileButton
                onClick={onProfileButtonClick}
                isFollowed={isFollowed}
                isOwnProfile={isOwnProfile}
              />
            </Stack>

            <ProfileStat
              statsData={{
                followers: profileData.followers,
                following: profileData.following,
                postsCount: profileData.posts.length,
              }}
              justifyItems={'start'}
              display={statsMd}
            />
          </VStack>
        </HStack>
        <VStack marginY={'4'} spacing={'1'}>
          <Text textAlign={'center'} fontSize={'md'} fontWeight={'bold'}>
            {profileData.fullname}
          </Text>
        </VStack>
        <VStack w='full' textAlign={'left'} gridColumn={'1/3'} spacing={'1'}>
          <Text>{profileData.bio}</Text>
        </VStack>
        {/* <Divider /> */}
      </SimpleGrid>
      <Divider my={4} display={statsBar} gridColumn={'1/3'} />
      <ProfileStat
        paddingX={'1rem'}
        statsData={{
          followers: profileData.followers,
          following: profileData.following,
          postsCount: profileData.posts.length,
        }}
        gridColumn={'1/3'}
        display={statsBar}
      />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent mx={'2'}>
          <ModalHeader>Edit profile</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <EditProfile
              initialData={{
                fullname: profileData.fullname,
                username: profileData.username,
                bio: profileData.bio,
                image: profileData?.image,
              }}
              onClose={onClose}
            />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Container>
  )
}

export default ProfileTab
