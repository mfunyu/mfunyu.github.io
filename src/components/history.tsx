import {
  Accordion,
  AccordionButton,
  AccordionIcon,
  AccordionItem,
  AccordionPanel,
  Box,
  Flex,
  Progress,
  Stack,
  Text,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react'
import { useEffect, useRef } from 'react'
import { historyData } from '../data/historyData'

type HistoryItemProps = {
  title: string
  progress: number
  description: string
  isCompleted: boolean
  isActive: boolean
  itemRef?: React.RefObject<HTMLDivElement>
}

const HistoryItem = ({ title, progress, description, isCompleted, isActive, itemRef }: HistoryItemProps) => {
  const cardBg = useColorModeValue("white", "gray.800")
  const borderColor = useColorModeValue(
    isActive ? "gray.600" : "gray.200", 
    isActive ? "gray.200" : "gray.600"
  )
  const hoverBorderColor = useColorModeValue(
    isActive ? "gray.700" : "gray.300", 
    isActive ? "gray.100" : "gray.500"
  )
  const hoverBg = useColorModeValue("gray.50", "gray.700")
  const textColor = useColorModeValue("gray.600", "gray.300")
  const percentageColor = useColorModeValue("gray.500", "gray.400")
  const progressBg = useColorModeValue("gray.100", "gray.600")
  const iconColor = useColorModeValue("gray.400", "gray.500")

  return (
    <AccordionItem border="none" mb={3} ref={itemRef}>
      <Box
        bg={cardBg}
        border="1px solid"
        borderColor={borderColor}
        borderRadius="lg"
        overflow="hidden"
        _hover={{ borderColor: hoverBorderColor, shadow: "sm" }}
        transition="all 0.2s"
      >
        <AccordionButton
          p={4}
          _hover={{ bg: hoverBg }}
          _expanded={{ bg: hoverBg }}
        >
          <Box flex="1" textAlign="left">
            <Stack spacing={3}>
              <Flex justify="space-between" align="center">
                <Text fontSize="lg" fontWeight="medium">{title}</Text>
                <Badge 
                  colorScheme={isCompleted ? "green" : "blue"}
                  variant="solid"
                  fontSize="xs"
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  {isCompleted ? "✓" : "•"}
                </Badge>
              </Flex>
              <Box>
                <Flex justify="space-between" align="center" mb={2}>
                  <Box />
                  <Text fontSize="xs" color={percentageColor} fontWeight="medium">{progress}%</Text>
                </Flex>
                <Progress 
                  size="xs" 
                  value={progress} 
                  isAnimated 
                  colorScheme={isCompleted ? "green" : "blue"}
                  borderRadius="full"
                  bg={progressBg}
                />
              </Box>
            </Stack>
          </Box>
          <AccordionIcon color={iconColor} />
        </AccordionButton>
        <AccordionPanel px={4} pb={4} pt={0}>
          <Text color={textColor} fontSize="sm" lineHeight="relaxed">
            {description}
          </Text>
        </AccordionPanel>
      </Box>
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

const isItemActive = (
  currentYear: number,
  startYear: number,
  startMonth: number,
  endYear?: number,
  endMonth?: number
): boolean => {
  const currentDecimal = currentYear
  const startDecimal = startYear + (startMonth - 1) / 12
  
  if (currentDecimal < startDecimal) return false
  
  // If no end date, item is active from start onwards
  if (!endYear || !endMonth) {
    return currentDecimal >= startDecimal
  }
  
  const endDecimal = endYear + (endMonth - 1) / 12
  return currentDecimal >= startDecimal && currentDecimal <= endDecimal
}

const History = ({ currentYear }: HistoryProps) => {
  // Sort history items by start date (chronological order)
  const sortedHistoryData = [...historyData].sort((a, b) => {
    const aStartDecimal = a.startYear + (a.startMonth - 1) / 12
    const bStartDecimal = b.startYear + (b.startMonth - 1) / 12
    return aStartDecimal - bStartDecimal
  })

  // Create refs for each history item
  const itemRefs = useRef<(React.RefObject<HTMLDivElement>)[]>(
    sortedHistoryData.map(() => useRef<HTMLDivElement>(null))
  )

  // Auto-scroll to active item
  useEffect(() => {
    const activeIndex = sortedHistoryData.findIndex((item) =>
      isItemActive(
        currentYear,
        item.startYear,
        item.startMonth,
        item.endYear,
        item.endMonth
      )
    )

    if (activeIndex !== -1 && itemRefs.current[activeIndex]?.current) {
      itemRefs.current[activeIndex].current?.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      })
    }
  }, [currentYear, sortedHistoryData])

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
          isActive={isItemActive(
            currentYear,
            item.startYear,
            item.startMonth,
            item.endYear,
            item.endMonth
          )}
          itemRef={itemRefs.current[index]}
        />
      ))}
    </Accordion>
  )
}

export default History
