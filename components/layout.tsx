/** @jsxImportSource @emotion/react */

import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'

// todo: orientations
const mq = (i: number) => `@media (min-width: ${i * 100}px)`

const red = '#cf2525'
// const red = '#91271a'

const Layout: FC = ({ children }) => {
  const { locale } = useRouter()
  return (
    <>
      <div
        css={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          height: '5rem',
          borderBottom: '1px solid #403850',
          background: '#443d52',
        }}
      >
        <div
          css={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            height: '100%',
            padding: '0 1rem',
            margin: '0 auto',
            [mq(9)]: { width: '55rem' },
            a: {
              color: 'white',
            },
          }}
        >
          <Link href='/'>
            <a
              css={{
                display: 'block',
                width: '5rem',
                height: '5rem',
                padding: 10,
                cursor: 'pointer',
                background: red,
              }}
            >
              home
            </a>
          </Link>
          <nav
            css={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              // gap: '1rem',
              '> *': { marginLeft: '1rem' },
            }}
          >
            <Link href='/about'>about</Link>
            <Link href='/works'>works</Link>
            <Link href='/experiments'>experiments</Link>
            <Link href='/blog'>blog</Link>
          </nav>
        </div>
      </div>
      <div
        css={{
          margin: '10rem auto 5rem',
          width: '100%',
          padding: '0 1rem',
          [mq(9)]: { width: '55rem' },
        }}
      >
        {children}
      </div>
      <div
        css={{
          margin: '10rem auto 0',
          width: '100%',
          height: '10rem',
          padding: '0 1rem',
          position: 'relative',
          [mq(9)]: { width: '55rem' },
        }}
      >
        {locale === 'en' && (
          <Link href='/' locale='ru'>
            ru
          </Link>
        )}
        {locale === 'ru' && (
          <Link href='/' locale='en'>
            en
          </Link>
        )}
        <br />
        <Link href='/'>gh</Link>
        <br />
        <Link href='/'>tw</Link>
      </div>
    </>
  )
}

export default Layout
