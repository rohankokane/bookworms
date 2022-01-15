import {
  Box,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverHeader,
  PopoverTrigger,
  Portal,
  Text,
} from '@chakra-ui/react'
import SuggestionList from 'components/feed/SuggestionList'
import UserTag from 'components/feed/UserTag'
import FormInput from 'components/Input'

function SearchBox() {
  return (
    <div style={{ position: 'relative' }}>
      <Popover placement='bottom'>
        <Box w='xs'>
          <PopoverTrigger>
            <FormInput
              onChange={(a, n) => {
                console.log(a, n)
              }}
              size={'sm'}
              id='search'
              type='text'
              placeholder='search'
            />
          </PopoverTrigger>
        </Box>

        <PopoverContent top={'2.2rem'} p={2} maxH='70vh' overflowY='auto'>
          <PopoverArrow />
          <Text fontSize={'sm'}>Search more bibliophiles</Text>
          <SuggestionList />
        </PopoverContent>
        {/* </Portal> */}
      </Popover>
    </div>
  )
}

export default SearchBox
