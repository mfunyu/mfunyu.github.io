import { Button, useColorMode } from '@chakra-ui/react'
import { SunIcon, MoonIcon } from '@chakra-ui/icons'

export default function ColorModeButton() {
  const { colorMode, toggleColorMode } = useColorMode()
  return (
    <Button variant="ghost" onClick={toggleColorMode}>
      {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
    </Button>
  )
}
