import { Flex } from '@chakra-ui/react'
import Logo from './logo'
import MenuLinks from './menu-links'

const Header = () => {
  return (
    <Flex align="center" justify="space-between" p={4} wrap="wrap">
      <Logo />
      <MenuLinks />
    </Flex>
  )
}

export default Header
