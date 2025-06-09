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
      <Box as="main" w="full" h="100vh" overflow="hidden">
        {children}
      </Box>
    </>
  )
}

export default Layout
