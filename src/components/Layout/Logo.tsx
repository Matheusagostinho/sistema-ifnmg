import { Image } from '@chakra-ui/react'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/students" passHref>
      <a>
        <Image
          src="/images/logo.png"
          alt="Logo IF"
          w={['142px', '142px', '152px']}
          h="100%"
        />
      </a>
    </Link>
  )
}
