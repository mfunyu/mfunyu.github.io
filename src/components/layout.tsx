import { Box } from '@chakra-ui/react'
import Head from 'next/head'
import { ReactNode } from 'react'
import Header from './header'

type Props = {
  children?: ReactNode
}

const Layout = ({ children }: Props) => {
  return (
    <>
      <Head>
        <title>mfunyu</title>
      </Head>
      <Header />
      <Box as="main" w="full" maxW="100vw" mx="auto">
        <Box maxW="100vw" mx="auto" minH="76vh" maxH="90vh">
          {children}
        </Box>
      </Box>
    </>
  )
}

export default Layout
