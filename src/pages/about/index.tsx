import { Box, Center, Flex, Heading } from '@chakra-ui/react'
import Layout from '../../components/layout'
import Timeline from '../../components/timeline'

const About = () => {
  return (
    <Layout>
      <Flex>
        <Box w="100%" p={4}>
          <Heading as="h2" size="lg" p={4}>
            Trajectory
          </Heading>
          <Flex px={10} py={8} w="100%">
            <Box flex="1">
              <Center>
                <Timeline />
              </Center>
            </Box>
          </Flex>
          <Box flex="1">
            <Center>WIP</Center>
          </Box>
        </Box>
      </Flex>
    </Layout>
  )
}

export default About
