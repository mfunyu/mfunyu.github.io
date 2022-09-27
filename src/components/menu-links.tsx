import { Box, Button, Link, HStack, Text } from '@chakra-ui/react'
import NextLink from 'next/link'
import ColorModeButton from '../components/color-mode-button'
import GithubButton from '../components/github-button'

type Props = {
  children: string
  to?: string
}

const MenuItem = ({ children, to = '/' }: Props) => {
  return (
    <Button variant="ghost">
      <NextLink href={to} passHref>
        <Link>
          <Text>{children}</Text>
        </Link>
      </NextLink>
    </Button>
  )
}

const MenuLinks = () => {
  return (
    <Box>
      <HStack spacing={2}>
        <MenuItem to="/works">Works</MenuItem>
        <MenuItem to="/about">About</MenuItem>
        <ColorModeButton />
        <GithubButton />
      </HStack>
    </Box>
  )
}

export default MenuLinks
