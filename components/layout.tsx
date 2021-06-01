/** @jsxImportSource @emotion/react */

import { FC } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/dist/client/router'
import { useTranslations } from 'use-intl'
import { useTheme } from '@emotion/react'
import s from '@emotion/styled'
import cn from 'classnames'
import Head from 'next/head'

import HomeIcon from '../public/icons/home.svg'
import theme from '../styles/theme'
import { TInfoData } from '../lib/api'

// not too adaptive yet
const AdaptiveContainer = s.div({
  width: '99rem',
  marginLeft: 'auto',
  marginRight: 'auto',
  // width: '100%',
  // '@media (min-width: 90rem)': {
  //   width: '99rem',
  //   marginLeft: 'auto',
  //   marginRight: 'auto',
  // },
})

const NavLink: FC<{ href: string }> = ({ href, children }) => {
  const router = useRouter()
  const isCurrent = href === '/' ? router.route === '/' : router.route.startsWith(href)
  return (
    <Link href={href}>
      <a className={cn({ '--current': isCurrent })}>{children}</a>
    </Link>
  )
}

const Nav: FC<{ routeNames: string[] }> = ({ routeNames }) => {
  const t = useTranslations()
  return (
    <nav
      css={{
        font: `bold 1.1rem ${theme.fonts.exo2}`,
        letterSpacing: '.52em',
        textTransform: 'uppercase',
        cursor: 'pointer',
        textAlign: 'right',
        marginRight: '-0.6rem',
        color: theme.colors.green1,
        fill: theme.colors.green1,
        '> *.--current, > *:hover': { color: 'white', fill: 'white' },
      }}
    >
      <NavLink href='/'>
        <HomeIcon css={{ fill: 'inherit', width: '1.1rem', height: '1.1rem' }} />
      </NavLink>
      {routeNames
        .map((routeName) => {
          return [
            ' / ',
            <NavLink key={routeName} href={`/${routeName}`}>
              {t(routeName)}
            </NavLink>,
          ]
        })
        .flat()}
    </nav>
  )
}

const IconLink: FC<{ href?: string; icon: string }> = ({ href, icon, children }) => {
  return (
    <a href={href} css={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
      <img src={`/icons/${icon}.svg`} css={{ width: '1rem', height: '1rem', margin: '0 .3rem' }} />
      <span>{children}</span>
    </a>
  )
}

const Layout: FC<{ info: TInfoData }> = ({ info, children }) => {
  const { colors, fonts } = useTheme()
  const { locale } = useRouter()
  const t = useTranslations()

  // todo: check if this causes re-renders

  const navJSX = (
    <div css={{ padding: '5.45rem 0 1.5rem' }}>
      <Nav routeNames={['about', 'works', 'experiments', 'blog']} />
    </div>
  )

  const mainJSX = (
    <main css={{ padding: '3.3rem', background: colors.skin1 }}>
      <div css={{ border: `1px solid #515f56`, background: '#7a8a80' }}>{children}</div>
    </main>
  )

  const underMainJSX = (
    <div css={{ padding: '4.2rem 2rem 5.7rem' }}>
      <h4
        css={{
          font: `400 2.5rem ${fonts.exo2}`,
          wordSpacing: '.2em',
          textAlign: 'right',
          color: colors.white,
        }}
      >
        Neo-Tokyo is about to <span css={{ letterSpacing: '0.17em' }}>E•X•P•L•O•D•E</span>
      </h4>
    </div>
  )

  const footerJSX = (
    <div
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'flex-start',
        height: '3.3rem',
        paddingTop: '.5rem',
        font: `italic 1.1rem ${fonts.openSans}`,
        textTransform: 'uppercase',
        letterSpacing: '0.03em',
        color: colors.yellow1,
        'a: hover': { textDecoration: 'underline' },
      }}
    >
      <div>
        <Link href='/' locale={locale === 'en' ? 'ru' : 'en'}>
          <a style={{ display: 'inline-flex', alignItems: 'center', cursor: 'pointer' }}>
            <img
              src={`/icons/globe.svg`}
              css={{ width: '1rem', height: '1rem', margin: '0 .3rem' }}
            />
            <span>{locale === 'en' ? 'ru' : 'en'}</span>
          </a>
          {/* <IconLink icon='globe'>{locale === 'en' ? 'ru' : 'en'}</IconLink> */}
        </Link>
      </div>
      <div>
        <IconLink href={info.twitter} icon='twitter'>
          {t('twitter')}
        </IconLink>
        {' / '}
        <IconLink href={info.github} icon='github'>
          {t('github')}
        </IconLink>
        {' / '}
        <IconLink href={info.linkedin} icon='linkedin'>
          {t('linkedin')}
        </IconLink>
      </div>
    </div>
  )

  return (
    <>
      <Head>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <div css={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <div css={{ flexGrow: 1, background: 'black' }}>
          <AdaptiveContainer>
            {navJSX}
            {mainJSX}
            {underMainJSX}
          </AdaptiveContainer>
        </div>
        <footer css={{ background: colors.red1 }}>
          <AdaptiveContainer>{footerJSX}</AdaptiveContainer>
        </footer>
      </div>
    </>
  )
}

export default Layout
