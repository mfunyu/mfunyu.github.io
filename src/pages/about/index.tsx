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
      <Flex>
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
            <History currentYear={currentTimelineYear} />
          </Box>
        </Box>
      </Flex>
    </Layout>
  )
}

export default About
