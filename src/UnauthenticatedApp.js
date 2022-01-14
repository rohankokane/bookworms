import {
  Center,
  Container,
  Divider,
  Flex,
  Grid,
  GridItem,
} from '@chakra-ui/react'
import AuthenticationForm from 'components/authPage/AuthenticationForm'
import Banner from 'components/authPage/Banner'
import { useState } from 'react'

function UnauthenticatedApp() {
  const [isLoginMode, setLoginMode] = useState(true)

  return (
    <main>
      <Container maxW='container.xl' p={0}>
        <Grid
          templateColumns={{ base: '1fr', md: 'repeat(8, 1fr)' }}
          minH={{ base: 'auto', md: '100vh' }}
          py={[0, 6, 10]}
        >
          <GridItem colSpan={{ base: 0, sm: 4, md: 5 }}>
            <Banner isLoginMode={isLoginMode} />
          </GridItem>
          <GridItem colSpan={{ base: 1, sm: 4, md: 3 }}>
            <Flex h={'full'} justifyContent={'space-between'}>
              <Center h={'100%'}>
                <Divider orientation='vertical' />
              </Center>
              <AuthenticationForm
                isLoginMode={isLoginMode}
                setLoginMode={setLoginMode}
              />
            </Flex>
          </GridItem>
        </Grid>
      </Container>
    </main>
  )
}

export default UnauthenticatedApp
