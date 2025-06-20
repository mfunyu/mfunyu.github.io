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
import React, { useEffect, useRef, useMemo } from 'react'
import { historyData, Status } from '../data/historyData'

const formatDateRange = (
  startYear: number,
  startMonth: number,
  endYear?: number,
  endMonth?: number
): string => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  
  const startDate = `${months[startMonth - 1]} ${startYear}`
  
  if (!endYear || !endMonth) {
    return `${startDate} - Present`
  }
  
  const endDate = `${months[endMonth - 1]} ${endYear}`
  return `${startDate} - ${endDate}`
}

type HistoryItemProps = {
  title: string
  progress: number
  description: string
  isActive: boolean
  startYear: number
  startMonth: number
  endYear?: number
  endMonth?: number
  location: string
  status: Status
  itemRef?: React.RefObject<HTMLDivElement>
}

const HistoryItem = ({ 
  title, 
  progress, 
  description, 
  isActive, 
  startYear, 
  startMonth, 
  endYear, 
  endMonth, 
  location, 
  status,
  itemRef 
}: HistoryItemProps) => {
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
  const locationBgColor = useColorModeValue("gray.100", "gray.700")
  const locationColor = useColorModeValue("gray.600", "gray.300")

  // Set status badge color and text
  const getStatusInfo = (status: Status) => {
    switch (status) {
      case Status.COMPLETED:
        return { colorScheme: 'green', icon: '✓' };
      case Status.IN_PROGRESS:
        return { colorScheme: 'blue', icon: '→' };
      case Status.UNFINISHED:
        return { colorScheme: 'gray', icon: '️-' };
      default:
        return { colorScheme: 'blue', icon: '•' };
    }
  }

  const statusInfo = getStatusInfo(status);

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
                <Box>
                  <Text fontSize="lg" fontWeight="medium">{title}</Text>
                  <Flex align="center" mt={1}>
                    <Text fontSize="xs" color={textColor}>
                      {formatDateRange(startYear, startMonth, endYear, endMonth)}
                    </Text>
                    <Badge
                      ml={2}
                      px={2}
                      py={0.5}
                      fontSize="xs"
                      bg={locationBgColor}
                      color={locationColor}
                      borderRadius="full"
                    >
                      {location}
                    </Badge>
                  </Flex>
                </Box>
                <Badge 
                  colorScheme={statusInfo.colorScheme}
                  variant="solid"
                  fontSize="xs"
                  px={2}
                  py={1}
                  borderRadius="full"
                >
                  {statusInfo.icon}
                </Badge>
              </Flex>
              <Box>
                <Flex justify="space-between" align="center" mb={2}>
                  <Box />
                  <Text fontSize="xs" color={percentageColor} fontWeight="medium">
                    {progress}%
                  </Text>
                </Flex>
                <Progress 
                  size="xs" 
                  value={progress} 
                  isAnimated 
                  colorScheme={statusInfo.colorScheme}
                  borderRadius="full"
                  bg={progressBg}
                />
              </Box>
            </Stack>
          </Box>
          <AccordionIcon color={iconColor} />
        </AccordionButton>
        <AccordionPanel px={4} pb={4} pt={2}>
          <Text color={textColor} fontSize="sm" lineHeight="relaxed" mt={2}>
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
  status: Status,
  endYear?: number,
  endMonth?: number
): number => {
  // Convert dates to decimal years for easier calculation
  const currentDecimal = currentYear
  const startDecimal = startYear + (startMonth - 1) / 12
  
  if (currentDecimal < startDecimal) return 0
  
  // If no end date is specified (ongoing project)
  if (!endYear || !endMonth) {
    // Calculate years since start
    const yearsSinceStart = currentDecimal - startDecimal
    
    // For in-progress projects, show progress based on time elapsed
    // Cap at 90% to indicate it's still in progress
    const progressBasedOnTime = Math.min(yearsSinceStart * 50, 90) // 50% per year, max 90%
    return Math.round(progressBasedOnTime)
  }
  
  const endDecimal = endYear + (endMonth - 1) / 12
  
  // For completed items, always show 100% if we're past the end date
  if (status === Status.COMPLETED && currentDecimal >= endDecimal) return 100

  // For unfinished items with end dates
  if (status === Status.UNFINISHED) {
    // If we're past the end date, show 80% (abandoned before completion)
    if (currentDecimal >= endDecimal) {
      return 80;
    }
    
    // Otherwise calculate progress based on time, capped at 80%
    const progress = ((currentDecimal - startDecimal) / (endDecimal - startDecimal)) * 80
    return Math.round(progress)
  }
  
  // For in-progress items with end dates
  if (status === Status.IN_PROGRESS) {
    // If we're past the end date, show 90% (still not complete)
    if (currentDecimal >= endDecimal) {
      return 90;
    }
    
    // Otherwise calculate progress based on time
    const progress = ((currentDecimal - startDecimal) / (endDecimal - startDecimal)) * 90
    return Math.round(progress)
  }
  
  // For other items with end dates
  const progress = ((currentDecimal - startDecimal) / (endDecimal - startDecimal)) * 100
  return Math.min(Math.round(progress), 100)
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
  // Sort history items by start date (descending order) - memoized to prevent unnecessary re-renders
  const sortedHistoryData = useMemo(() => {
    return [...historyData].sort((a, b) => {
      const aStartDecimal = a.startYear + (a.startMonth - 1) / 12
      const bStartDecimal = b.startYear + (b.startMonth - 1) / 12
      return bStartDecimal - aStartDecimal
    })
  }, []) // Empty dependency array since historyData is static

  // Create refs for each history item
  const itemRefs = useRef<React.RefObject<HTMLDivElement>[]>([])
  
  // Initialize refs array if needed
  if (itemRefs.current.length !== sortedHistoryData.length) {
    itemRefs.current = sortedHistoryData.map(() => React.createRef<HTMLDivElement>())
  }
  
  // Container ref to check visibility
  const containerRef = useRef<HTMLDivElement>(null)

  // Helper function to check if an element is visible in the viewport
  const isElementVisible = (element: HTMLElement, container: HTMLElement): boolean => {
    const elementRect = element.getBoundingClientRect()
    const containerRect = container.getBoundingClientRect()
    
    // Check if the element is within the visible area of the container
    return (
      elementRect.top >= containerRect.top &&
      elementRect.bottom <= containerRect.bottom
    )
  }

  // Auto-scroll to active item only if not visible
  useEffect(() => {
    // Wait a bit to ensure refs are properly attached
    const timer = setTimeout(() => {
      const activeIndex = sortedHistoryData.findIndex((item) =>
        isItemActive(
          currentYear,
          item.startYear,
          item.startMonth,
          item.endYear,
          item.endMonth
        )
      )

      if (activeIndex !== -1 && 
          itemRefs.current[activeIndex]?.current && 
          containerRef.current) {
        
        const activeElement = itemRefs.current[activeIndex].current
        const containerElement = containerRef.current
        
        // Only scroll if the element is not already visible
        if (activeElement && containerElement && !isElementVisible(activeElement, containerElement)) {
          activeElement.scrollIntoView({
            behavior: 'smooth',
            block: 'start',
          })
        }
      }
    }, 100)
    
    return () => clearTimeout(timer)
  }, [currentYear]) // Removed sortedHistoryData since it's now memoized and stable

  return (
    <Box ref={containerRef} h="100%" overflowY="auto">
      <Accordion allowToggle>
        {sortedHistoryData.map((item, index) => (
          <HistoryItem
            key={index}
            title={item.title}
            progress={calculateProgress(
              currentYear,
              item.startYear,
              item.startMonth,
              item.status,
              item.endYear,
              item.endMonth
            )}
            description={item.description}
            isActive={isItemActive(
              currentYear,
              item.startYear,
              item.startMonth,
              item.endYear,
              item.endMonth
            )}
            startYear={item.startYear}
            startMonth={item.startMonth}
            endYear={item.endYear}
            endMonth={item.endMonth}
            location={item.location}
            status={item.status}
            itemRef={itemRefs.current[index]}
          />
        ))}
      </Accordion>
    </Box>
  )
}

export default History
