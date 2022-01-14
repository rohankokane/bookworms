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
} from '@chakra-ui/react'
import ProfileStat from './ProfileStat'

function ProfileTab() {
  const uidColSpan = useBreakpointValue({ base: 2, md: 1 })
  const avatarSize = useBreakpointValue({ base: 'xl', md: '2xl' })
  const statsBar = useBreakpointValue({ base: 'grid', md: 'none' })
  const statsMd = useBreakpointValue({ base: 'none', md: 'grid' })

  return (
    <Container p={0} size={{ base: 'full', md: 'container.md' }}>
      <VStack align={'start'} spacing={4}>
        <HStack align={'start'} w={'full'} spacing={6}>
          <Avatar
            size={avatarSize}
            name='Dan Abrahmov'
            src='https://bit.ly/dan-abramov'
          />
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
                User Id
              </Text>
              {/* </GridItem>
            <GridItem colSpan={1}> */}
              <Button variant={'outline'} size={'md'} height={'7'}>
                Follow
              </Button>
              {/* </GridItem> */}
            </Stack>

            <ProfileStat justifyItems={'start'} display={statsMd} />
          </VStack>
        </HStack>
        <VStack align={'start'} spacing={'3'}>
          <Text fontSize={'sm'} fontWeight={'bold'}>
            dan name
          </Text>
          <Text>
            Lorem ipsum dolor sit amet, consectetur adipisicing elit. Veritatis,
            mollitia.
          </Text>
        </VStack>
        <Divider display={statsBar} />
        <ProfileStat display={statsBar} />
        {/* <Divider /> */}
      </VStack>
    </Container>
  )
}

export default ProfileTab
