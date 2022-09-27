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
  useColorModeValue,
} from '@chakra-ui/react'
import { useState } from 'react'
import Layout from '../../components/layout'

const labelStyles = {
  mt: '2',
  ml: '-70',
  fontSize: 'm',
}

const Timeline = () => {
  const [sliderValue, setSliderValue] = useState(2022)

  return (
    <Slider
      aria-label="timeline"
      colorScheme={useColorModeValue('blackAlpha', 'whiteAlpha')}
      defaultValue={2022}
      orientation="vertical"
      minH="32"
      onChange={(val) => setSliderValue(val)}
      min={2019}
      max={2022}
      step={1}
      size="lg"
    >
      <SliderMark value={2019} {...labelStyles}>
        2019
      </SliderMark>
      <SliderMark value={2020} {...labelStyles}>
        2020
      </SliderMark>
      <SliderMark
        value={sliderValue}
        textAlign="center"
        mt="-10"
        mr="-50"
        w="12"
      >
        {sliderValue}
      </SliderMark>
      <SliderTrack>
        <SliderFilledTrack />
      </SliderTrack>
      <SliderThumb boxSize={10}>
        <Box>🚀</Box>
      </SliderThumb>
    </Slider>
  )
}

const About = () => {
  return (
    <Layout>
      <Flex>
        <Box w="100%" p={4}>
          <Heading as="h2" size="lg" p={4}>
            Trajectory
          </Heading>
          <Flex p={8} h="500px">
            <Center w="150px">
              <Timeline />
            </Center>
            <Box flex="1">
              <Center>WIP</Center>
            </Box>
          </Flex>
        </Box>
      </Flex>
    </Layout>
  )
}

export default About
