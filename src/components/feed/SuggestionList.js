import { List, ListItem } from '@chakra-ui/react'
import UserTag from './UserTag'

function SuggestionList({ list, ...props }) {
  if (!list?.length) return 'Follow new people'
  return (
    <List w={'full'} spacing={3} overflowY={'auto'} {...props}>
      {list.map((profile) => (
        <ListItem key={profile.id}>
          <UserTag profile={profile} />
        </ListItem>
      ))}
    </List>
  )
}

export default SuggestionList
