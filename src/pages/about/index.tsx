import { Box, Center, Flex, Heading, HStack } from '@chakra-ui/react'
import History from '../../components/history'
import Layout from '../../components/layout'
import Timeline from '../../components/timeline'

const About = () => {
  return (
    <Layout>
      <Flex>
        <Flex maxW="300px" w="20%" h="80vh">
          <Box px={10} py={4}>
            <Timeline />
          </Box>
        </Flex>
        <Flex>
          <Box px={10} flex="1">
            <History />
          </Box>
        </Flex>
      </Flex>
    </Layout>
  )
}

export default About
