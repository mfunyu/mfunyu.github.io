import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Progress,
  Stack,
  Text,
  Badge,
} from '@chakra-ui/react'
import { historyData } from '../data/historyData'

type HistoryItemProps = {
  title: string
  progress: number
  description: string
  isCompleted: boolean
}

const HistoryItem = ({ title, progress, description, isCompleted }: HistoryItemProps) => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Stack spacing={5}>
              <Box flex="1" textAlign="left">
                <Stack direction="row" spacing={2} align="center">
                  <Text>{title}</Text>
                  <Badge 
                    colorScheme={isCompleted ? "green" : "blue"}
                    variant="subtle"
                    fontSize="xs"
                  >
                    {isCompleted ? "Completed" : "In Progress"}
                  </Badge>
                </Stack>
              </Box>
              <Box pb={4} flex="1" textAlign="left">
                <Progress 
                  size="xs" 
                  value={progress} 
                  isAnimated 
                  colorScheme={isCompleted ? "green" : "blue"}
                />
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
  endYear?: number,
  endMonth?: number,
  isCompleted?: boolean
): number => {
  // Convert dates to decimal years for easier calculation
  const currentDecimal = currentYear
  const startDecimal = startYear + (startMonth - 1) / 12
  
  if (currentDecimal < startDecimal) return 0
  
  // If no end date is specified (ongoing project)
  if (!endYear || !endMonth) {
    // Calculate years since start
    const yearsSinceStart = currentDecimal - startDecimal
    
    // For ongoing projects, show progress based on time elapsed
    // Cap at 80% to indicate it's still in progress
    const progressBasedOnTime = Math.min(yearsSinceStart * 50, 90) // 25% per year, max 80%
    return Math.round(progressBasedOnTime)
  }
  
  const endDecimal = endYear + (endMonth - 1) / 12
  
  // For completed items, always show 100% if we're past the end date
  if (isCompleted && currentDecimal >= endDecimal) return 100
  
  // For non-completed items with end dates, don't show 100% even if past end date
  if (!isCompleted && currentDecimal >= endDecimal) {
    return 90
  }
  
  const progress = ((currentDecimal - startDecimal) / (endDecimal - startDecimal)) * 100
  return Math.round(progress)
}

type HistoryProps = {
  currentYear: number
}

const History = ({ currentYear }: HistoryProps) => {
  // Sort history items by start date (chronological order)
  const sortedHistoryData = [...historyData].sort((a, b) => {
    const aStartDecimal = a.startYear + (a.startMonth - 1) / 12
    const bStartDecimal = b.startYear + (b.startMonth - 1) / 12
    return aStartDecimal - bStartDecimal
  })

  return (
    <Accordion allowToggle>
      {sortedHistoryData.map((item, index) => (
        <HistoryItem
          key={index}
          title={item.title}
          progress={calculateProgress(
            currentYear,
            item.startYear,
            item.startMonth,
            item.endYear,
            item.endMonth,
            item.isCompleted
          )}
          description={item.description}
          isCompleted={item.isCompleted}
        />
      ))}
    </Accordion>
  )
}

export default History
