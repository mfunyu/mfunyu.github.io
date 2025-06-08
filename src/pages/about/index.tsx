import { Box, Center, Flex, Heading } from '@chakra-ui/react'
import { useState } from 'react'
import History from '../../components/history'
import Layout from '../../components/layout'
import Timeline from '../../components/timeline'

const About = () => {
  const startYear = 2019
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const maxYear = currentYear + (1 / 12) * currentMonth
  
  const [currentTimelineYear, setCurrentTimelineYear] = useState(maxYear)

  return (
    <Layout>
      <Flex direction="column" h="100vh">
        <Box w="100%" p={4}>
          <Flex px={10} py={8} w="100%">
            <Box flex="1">
              <Center>
                <Timeline 
                  currentYear={currentTimelineYear}
                  onYearChange={setCurrentTimelineYear}
                />
              </Center>
            </Box>
          </Flex>
          <Box px={10} flex="1">
            <Box
              h="60vh"
              overflowY="auto"
              overflowX="hidden"
              pr={2}
              sx={{
                '&::-webkit-scrollbar': {
                  width: '6px',
                },
                '&::-webkit-scrollbar-track': {
                  background: 'transparent',
                },
                '&::-webkit-scrollbar-thumb': {
                  background: 'gray.300',
                  borderRadius: '3px',
                },
                '&::-webkit-scrollbar-thumb:hover': {
                  background: 'gray.400',
                },
              }}
            >
              <History currentYear={currentTimelineYear} />
            </Box>
          </Box>
        </Box>
      </Flex>
    </Layout>
  )
}

export default About
