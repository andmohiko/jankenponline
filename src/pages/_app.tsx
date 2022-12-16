import '~/styles/reset.css'
import '~/styles/globals.css'
import { ChakraProvider } from '@chakra-ui/react'
import { RecoilRoot } from 'recoil'

import type { AppProps } from 'next/app'

const MyApp = ({ Component, pageProps }: AppProps) => {
  return (
    <RecoilRoot>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </RecoilRoot>
  )
}

export default MyApp
