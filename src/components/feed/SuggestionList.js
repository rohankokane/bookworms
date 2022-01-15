import { List, ListItem } from '@chakra-ui/react'
import UserTag from './UserTag'

function SuggestionList() {
  return (
    <List w={'14rem'} spacing={3}>
      <ListItem>
        <UserTag />
      </ListItem>
      <ListItem>
        <UserTag />
      </ListItem>
    </List>
  )
}

export default SuggestionList
