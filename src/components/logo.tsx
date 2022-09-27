import { LinkBox, LinkOverlay } from '@chakra-ui/react'

const Logo = () => {
  return (
    <LinkBox px={8}>
      <LinkOverlay href="/" fontSize="lg" fontWeight="bold">
        mfunyu / U
      </LinkOverlay>
    </LinkBox>
  )
}

export default Logo
