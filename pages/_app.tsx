import { FC } from 'react'
import { AppProps } from 'next/app'
import { Global as GlobalStyles, ThemeProvider } from '@emotion/react'
import { NextIntlProvider } from 'next-intl'

import theme from '../styles/theme'
import reset from '../styles/reset'
import global from '../styles/global'
import imports from '../styles/imports'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <NextIntlProvider messages={pageProps.messages}>
      <ThemeProvider theme={theme}>
        <Component {...pageProps} />
        <GlobalStyles styles={[imports, reset, global]} />
      </ThemeProvider>
    </NextIntlProvider>
  )
}

export default App
