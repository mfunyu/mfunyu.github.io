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
  mb: '-2',
  fontSize: 'sm',
}

type Props = {
  minYear: number
  maxYear: number
}

const TimelineUI = ({ minYear, maxYear }: Props) => {
  const [sliderValue, setSliderValue] = useState(maxYear)
  const [showTooltip, setShowTooltip] = useState(false)

  let slideMarks = []
  const color = useColorModeValue('blackAlpha.600', 'whiteAlpha.500')
  for (let i = minYear; i <= maxYear; i++) {
    slideMarks.push(
      <SliderMark value={i} {...labelStyles} color={color}>
        <Box whiteSpace="nowrap">ー {i}</Box>
      </SliderMark>
    )
  }

  const valueToDate = (value: number) => {
    const year = Math.floor(sliderValue)
    const months = (sliderValue - year) * 12 + 1
    return year + '/' + months
  }

  return (
    <Slider
      aria-label="timeline"
      colorScheme={useColorModeValue('blackAlpha', 'whiteAlpha')}
      defaultValue={maxYear}
      minH="32"
      onChange={(val) => setSliderValue(val)}
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      min={minYear}
      max={maxYear}
      orientation="vertical"
      step={3 / 12}
      size="lg"
    >
      {slideMarks}
      <Tooltip
        hasArrow
        bg={useColorModeValue('blackAlpha.800', 'whiteAlpha.800')}
        colorScheme={useColorModeValue('blackAlpha.600', 'whiteAlpha.600')}
        placement="right"
        mb="5"
        isOpen={showTooltip}
        label={valueToDate(sliderValue)}
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

const Timeline = () => {
  const startYear = 2019
  const currentYear = new Date().getFullYear()
  const currentMonth = new Date().getMonth()
  const yearValue = currentYear + (1 / 12) * currentMonth
  return <TimelineUI minYear={startYear} maxYear={yearValue} />
}

export default Timeline
