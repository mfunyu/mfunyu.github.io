import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Progress,
  Stack,
} from '@chakra-ui/react'

type HistoryItemProps = {
  title: string
  progress: number
  description: string
}

type HistoryData = {
  title: string
  startYear: number
  startMonth: number
  endYear: number
  endMonth: number
  description: string
}

const HistoryItem = ({ title, progress, description }: HistoryItemProps) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Stack spacing={5}>
              <Box flex="1" textAlign="left">
                {title}
              </Box>
              <Box pb={4} flex="1" textAlign="left">
                <Progress size="xs" value={progress} isAnimated />
              </Box>
            </Stack>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        {description}
      </AccordionPanel>
    </AccordionItem>
  )
}

const calculateProgress = (
  currentYear: number,
  startYear: number,
  startMonth: number,
  endYear: number,
  endMonth: number
): number => {
  // Convert dates to decimal years for easier calculation
  const currentDecimal = currentYear
  const startDecimal = startYear + (startMonth - 1) / 12
  const endDecimal = endYear + (endMonth - 1) / 12
  
  if (currentDecimal < startDecimal) return 0
  if (currentDecimal >= endDecimal) return 100
  
  const progress = ((currentDecimal - startDecimal) / (endDecimal - startDecimal)) * 100
  return Math.round(progress)
}

type HistoryProps = {
  currentYear: number
}

const History = ({ currentYear }: HistoryProps) => {
  const historyData: HistoryData[] = [
    {
      title: '42Tokyo',
      startYear: 2020,
      startMonth: 6,
      endYear: 2023,
      endMonth: 6,
      description: 'Completed comprehensive software engineering education at 42Tokyo through hands-on project-based learning. Mastered C programming, Unix systems, algorithms, and data structures. Developed problem-solving skills through peer-to-peer collaboration and self-directed learning in a gamified environment.'
    },
    {
      title: '42Lyon',
      startYear: 2023,
      startMonth: 7,
      endYear: 2025,
      endMonth: 3,
      description: 'Completed my studies at 42Lyon, a tuition-free computer programming school. Developed strong skills in C/C++, system administration, and collaborative problem-solving through peer-to-peer learning methodology.'
    },
    {
      title: 'Internship',
      startYear: 2024,
      startMonth: 9,
      endYear: 2025,
      endMonth: 3,
      description: 'Gained practical experience in software development through various internship opportunities. Worked on real-world projects, collaborated with development teams, and applied theoretical knowledge to solve business challenges.'
    }
  ]

  return (
    <Accordion allowToggle>
      {historyData.map((item, index) => (
        <HistoryItem
          key={index}
          title={item.title}
          progress={calculateProgress(
            currentYear,
            item.startYear,
            item.startMonth,
            item.endYear,
            item.endMonth
          )}
          description={item.description}
        />
      ))}
    </Accordion>
  )
}

export default History
