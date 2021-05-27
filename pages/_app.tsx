import { FC } from 'react'
import { AppProps } from 'next/app'
import { Global } from '@emotion/react'

// todo: style reset file

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
          button: {
            fontSize: 'inherit',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: 'auto',
            height: '1.6em',
            lineHeight: '1.6em',
            padding: '0 0.5em',
            border: 0,
            background: '#eaeaea',
            cursor: 'pointer',
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
