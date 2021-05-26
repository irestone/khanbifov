import { FC } from 'react'
import { AppProps } from 'next/app'
import { Global } from '@emotion/react'

const App: FC<AppProps> = ({ Component, pageProps }) => {
  return (
    <>
      <Global
        styles={{
          'html, body': {
            padding: 0,
            margin: 0,
            fontFamily: 'Segoe UI, sans-serif',
            lineHeight: 1.6,
            fontSize: '16px',
          },
          '*, *:before, *:after': {
            boxSizing: 'border-box',
          },
          a: {
            color: '#0070f3',
            textDecoration: 'none',
            '&:hover': {
              textDecoration: 'underline',
            },
          },
          img: {
            maxWidth: '100%',
            display: 'block',
          },
          body: {
            background: '#f3f2f1',
          },
        }}
      />
      <Component {...pageProps} />
    </>
  )
}

export default App
