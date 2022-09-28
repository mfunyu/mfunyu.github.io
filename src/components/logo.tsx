import { LinkBox, LinkOverlay } from '@chakra-ui/react'
import NextLink from 'next/link'

const Logo = () => {
  return (
    <LinkBox px={8}>
      <NextLink href="/" passHref>
        <LinkOverlay fontSize="lg" fontWeight="bold">
          mfunyu / U
        </LinkOverlay>
      </NextLink>
    </LinkBox>
  )
}

export default Logo
