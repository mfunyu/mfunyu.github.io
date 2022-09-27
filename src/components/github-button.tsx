import { Button, Link } from '@chakra-ui/react'
import { Icon } from '@chakra-ui/icons'
import { GithubIcon } from './icons/github'
import NextLink from 'next/link'

export default function GithubButton() {
  return (
    <Button>
      <NextLink href={'https://github.com/mfunyu'} passHref>
        <Link isExternal>
          <Icon as={GithubIcon} />
        </Link>
      </NextLink>
    </Button>
  )
}
