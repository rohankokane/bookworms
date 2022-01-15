import {
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react'
import CreatePostForm from './CreatePostForm'

function CreatePost({ isOpen, onClose }) {
  const handleCreatePost = (data) => {
    console.log(data)
  }
  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create new post</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <CreatePostForm onSubmit={handleCreatePost} />
        </ModalBody>
      </ModalContent>
    </Modal>
  )
}

export default CreatePost
