import {
  Box,
  Button,
  Container,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import SuggestionList from 'components/feed/SuggestionList'
import { useState } from 'react'

function ProfileStat({ statsData, ...props }) {
  const { followers, following, postsCount } = statsData
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [modalHeading, setModalHeading] = useState('')
  const [modalList, setModalList] = useState([])
  const openModal = (type) => {
    if (type === 'follower') {
      setModalHeading('Followers')
      setModalList([...followers])
    } else {
      setModalHeading('Following')
      setModalList([...following])
    }
    onOpen()
  }
  return (
    <Box {...props} w={'full'} maxW={'sm'}>
      <SimpleGrid w={'full'} columns={3} spacing={3}>
        <HStack spacing={'2'}>
          <Text fontWeight={'bold'}>{postsCount}</Text>
          <Text fontSize={'sm'} color={'gray.600'}>
            posts
          </Text>
        </HStack>

        <HStack
          onClick={() => {
            openModal('follower')
          }}
          spacing={1}
        >
          <Text fontWeight={'bold'}>{followers?.length}</Text>
          <Text fontSize={'sm'} color={'gray.600'}>
            followers
          </Text>
        </HStack>

        <HStack
          onClick={() => {
            openModal('following')
          }}
          spacing={1}
        >
          <Text fontWeight={'bold'}>{following?.length}</Text>
          <Text fontSize={'sm'} color={'gray.600'}>
            following
          </Text>
        </HStack>
      </SimpleGrid>
      <Modal onClose={onClose} isOpen={isOpen} isCentered>
        <ModalOverlay />
        <ModalContent paddingBottom={'3'}>
          <ModalHeader>{modalHeading}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <SuggestionList list={modalList} maxH='70vh' />
          </ModalBody>
        </ModalContent>
      </Modal>
    </Box>
  )
}

export default ProfileStat
