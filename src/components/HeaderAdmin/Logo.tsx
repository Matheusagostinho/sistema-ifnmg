import { Image } from '@chakra-ui/react'
import Link from 'next/link'

export function Logo() {
  return (
    <Link href="/admin/dashboard" passHref>
      <a>
        <Image src="/images/logoGray.png" alt="AjudaAi" w="132px" />
      </a>
    </Link>
  )
}
