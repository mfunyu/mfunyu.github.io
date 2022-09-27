import { Box, Flex, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import Layout from '../components/layout'

const Home: NextPage = () => {
  return (
    <Layout>
      <Flex
        direction="column"
        alignItems="center"
        justifyContent="center"
        minHeight="70vh"
        gap={4}
        mb={8}
        w="full"
      >
        <Box
          borderRadius="4px"
          px={16}
          py={4}
          shadow="sm"
          borderWidth="1px"
          _hover={{ borderColor: '#00BABC' }}
        >
          <Heading fontSize="xl">Hello World?</Heading>
        </Box>
      </Flex>
    </Layout>
  )
}

export default Home
