import type { AppProps } from 'next/app'
import { ChakraProvider } from '@chakra-ui/react'
import { appWithTranslation } from 'next-i18next'
import { theme } from '../theme'
import { ProvideAuth } from 'utils'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ProvideAuth>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </ProvideAuth>
  )
}
export default appWithTranslation(MyApp)
