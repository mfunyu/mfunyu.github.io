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

const HistoryItem = () => {
  return (
    <AccordionItem>
      <h2>
        <AccordionButton>
          <Box flex="1" textAlign="left">
            <Stack spacing={5}>
              <Box flex="1" textAlign="left">
                42Tokyo
              </Box>
              <Box pb={4} flex="1" textAlign="left">
                <Progress size="xs" value={80} isAnimated />
              </Box>
            </Stack>
          </Box>
          <AccordionIcon />
        </AccordionButton>
      </h2>
      <AccordionPanel pb={4}>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod
        tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim
        veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea
        commodo consequat.
      </AccordionPanel>
    </AccordionItem>
  )
}

const History = () => {
  return (
    <Accordion allowToggle>
      <HistoryItem />
    </Accordion>
  )
}

export default History
