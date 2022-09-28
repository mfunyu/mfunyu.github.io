import { Box, Center, Flex, Heading } from '@chakra-ui/react'
import History from '../../components/history'
import Layout from '../../components/layout'
import Timeline from '../../components/timeline'

const About = () => {
  return (
    <Layout>
      <Flex>
        <Box w="100%" p={4}>
          <Flex px={10} py={8} w="100%">
            <Box flex="1">
              <Center>
                <Timeline />
              </Center>
            </Box>
          </Flex>
          <Box px={10} flex="1">
            <History />
          </Box>
        </Box>
      </Flex>
    </Layout>
  )
}

export default About
