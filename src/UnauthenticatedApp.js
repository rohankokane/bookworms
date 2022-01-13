import {
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import AuthenticationForm from 'components/AuthenticationForm'
import Banner from 'components/Banner'

function UnauthenticatedApp() {
  return (
    <main>
      <Container maxW='container.xl' p={0}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(8, 1fr)' }}
          minH={{ base: 'auto', md: '100vh' }}
          py={[0, 6, 10]}
        >
          <GridItem colSpan={{ base: 0, sm: 4, md: 5 }}>
            <Banner />
          </GridItem>
          <GridItem colSpan={{ base: 1, sm: 4, md: 3 }}>
            <Flex h={'full'} justifyContent={'space-between'}>
              <Center h={'100%'}>
                <Divider orientation='vertical' />
              </Center>
              <AuthenticationForm />
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </main>
  )
}

export default UnauthenticatedApp
