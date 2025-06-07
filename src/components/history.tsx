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
import { historyData, HistoryData } from '../data/historyData'

type HistoryItemProps = {
  title: string
  progress: number
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
