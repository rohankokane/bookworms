import { List, ListItem } from '@chakra-ui/react'
import UserTag from './UserTag'

function SuggestionList() {
  return (
    <List spacing={3}>
      <ListItem>
        <UserTag />
      </ListItem>
    </List>
  )
}

export default SuggestionList
