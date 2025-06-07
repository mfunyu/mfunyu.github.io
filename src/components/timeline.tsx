import {
  Box,
  Center,
  Flex,
  Heading,
  Slider,
  SliderFilledTrack,
  SliderMark,
  SliderThumb,
  SliderTrack,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'

const labelStyles = {
  mt: '10',
  ml: '-4',
  fontSize: 'sm',
}

type Props = {
  minYear: number
  maxYear: number
  currentYear: number
  onYearChange: (year: number) => void
}

const getMonthName = (monthIndex: number) => {
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 
                  'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
  // Ensure month index is within bounds (0-11)
  const safeIndex = Math.max(0, Math.min(11, Math.floor(monthIndex)))
  return months[safeIndex]
}

const formatYearMonth = (decimalYear: number) => {
  const year = Math.floor(decimalYear)
  const monthDecimal = (decimalYear - year) * 12
  // Round to nearest month for more accuracy, then ensure it's within bounds
  const month = Math.round(monthDecimal)
  const safeMonth = Math.max(0, Math.min(11, month))
  
  // Handle edge case where rounding might push us to month 12
  if (safeMonth === 12 || month >= 12) {
    return `${getMonthName(0)} ${year + 1}`
  }
  
  return `${getMonthName(safeMonth)} ${year}`
}

const TimelineUI = ({ minYear, maxYear, currentYear, onYearChange }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false)

  let slideMarks = []
  const color = useColorModeValue('blackAlpha.600', 'whiteAlpha.600')
  
  // Create marks for each year
  for (let i = Math.ceil(minYear); i <= Math.floor(maxYear); i++) {
    slideMarks.push(
      <SliderMark key={i} value={i} {...labelStyles} color={color}>
        <Box>
          <Center>
            |<br />
          </Center>
          {i}
        </Box>
      </SliderMark>
    )
  }

  // Add quarter marks for smoother visual reference
  for (let i = Math.ceil(minYear); i <= Math.floor(maxYear); i++) {
    for (let quarter = 0.25; quarter < 1; quarter += 0.25) {
      const markValue = i + quarter
      if (markValue <= maxYear) {
        slideMarks.push(
          <SliderMark key={`${i}-${quarter}`} value={markValue} mt="10" ml="-1" fontSize="xs" color={color}>
            <Box>
              <Center>
                ·
              </Center>
            </Box>
          </SliderMark>
        )
      }
    }
  }

  return (
    <Slider
      aria-label="timeline"
      colorScheme={useColorModeValue('blackAlpha', 'whiteAlpha')}
      value={currentYear}
      minH="32"
      onChange={onYearChange}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      min={minYear}
      max={maxYear}
      step={1/12} // Monthly precision instead of quarterly
      size="lg"
    >
      {slideMarks}
      <Tooltip
        hasArrow
        bg={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
        colorScheme={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}
        placement="top"
        mb="5"
        isOpen={showTooltip}
        label={formatYearMonth(currentYear)}
      >
        <SliderThumb boxSize={10} bg="none">
          <Box>
            <Text fontSize="2xl">🚀</Text>
          </Box>
        </SliderThumb>
      </Tooltip>
      <SliderTrack h="6px" borderRadius="3px">
        <SliderFilledTrack borderRadius="3px" />
      </SliderTrack>
    </Slider>
  )
}

type TimelineProps = {
  currentYear: number
  onYearChange: (year: number) => void
}

const Timeline = ({ currentYear, onYearChange }: TimelineProps) => {
  const startYear = 2019
  const currentYearActual = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const maxYear = currentYearActual + (1 / 12) * currentMonth
  return <TimelineUI minYear={startYear} maxYear={maxYear} currentYear={currentYear} onYearChange={onYearChange} />
}

export default Timeline
