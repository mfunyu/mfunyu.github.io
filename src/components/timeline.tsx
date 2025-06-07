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

const TimelineUI = ({ minYear, maxYear, currentYear, onYearChange }: Props) => {
  const [showTooltip, setShowTooltip] = useState(false)

  let slideMarks = []
  const color = useColorModeValue('blackAlpha.600', 'whiteAlpha.600')
  for (let i = minYear; i <= maxYear; i++) {
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
      step={3 / 12}
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
        label={`${Math.floor(currentYear)}`}
      >
        <SliderThumb boxSize={10} bg="none">
          <Box>
            <Text fontSize="2xl">🚀</Text>
          </Box>
        </SliderThumb>
      </Tooltip>
      <SliderTrack h="6px">
        <SliderFilledTrack />
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
