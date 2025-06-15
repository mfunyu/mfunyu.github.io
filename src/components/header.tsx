import { Flex, useColorModeValue } from '@chakra-ui/react'
import Logo from './logo'
import MenuLinks from './menu-links'

// Define header height as a constant for consistency
export const HEADER_HEIGHT = '64px'

const Header = () => {
  const headerBg = useColorModeValue('white', 'gray.800')
  
  return (
    <Flex 
      as="header"
      align="center" 
      justify="space-between" 
      px={6}
      h={HEADER_HEIGHT}
      position="fixed"
      top={0}
      left={0}
      right={0}
      zIndex={100}
      bg={headerBg}
      shadow="sm"
    >
      <Logo />
      <MenuLinks />
    </Flex>
  )
}

export default Header
