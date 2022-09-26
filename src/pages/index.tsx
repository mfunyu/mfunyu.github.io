import { Box, Flex, Heading } from '@chakra-ui/react'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import ColorModeButton from '../components/color-mode-button'
import GithubButton from '../components/github-button'

const Home: NextPage = () => {
  return (
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
        <Heading fontSize="xl">Yuu Funyu</Heading>
      </Box>
      <ColorModeButton />
      <GithubButton />
    </Flex>
  )
}

export default Home
