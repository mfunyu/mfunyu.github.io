import { Box, Center, Flex } from '@chakra-ui/react'
import { useState } from 'react'
import History from '../../components/history'
import Layout from '../../components/layout'
import Timeline from '../../components/timeline'
import { HEADER_HEIGHT } from '../../components/header'

const About = () => {
  const startYear = 2019
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const maxYear = currentYear + (1 / 12) * currentMonth
  
  const [currentTimelineYear, setCurrentTimelineYear] = useState(maxYear)

  return (
    <Layout>
      <Center>
        <Flex 
          direction="column" 
          h="100vh" 
          pt={HEADER_HEIGHT}
          maxW="1200px"
          w="100%"
        >
        {/* Timeline Section */}
        <Box 
          px="clamp(1rem, 8vw, 6rem)"
          py="clamp(1rem, 5vh, 3rem)"
          minH="fit-content"
          flexShrink={0}
        >
          <Center>
            <Timeline 
              currentYear={currentTimelineYear}
              onYearChange={setCurrentTimelineYear}
            />
          </Center>
        </Box>

        {/* History Section */}
        <Box 
          px="clamp(1rem, 8vw, 6rem)"
          pb="clamp(1rem, 5vh, 3rem)"
          flex="1"
          minH={0}
          overflowY="auto"
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
        </Flex>
      </Center>
    </Layout>
  )
}

export default About
