/** @jsxImportSource @emotion/react */

import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'
import { FC, useMemo, useState } from 'react'
import { useTranslations } from 'use-intl'
import s from '@emotion/styled'
import { difference, filter, sortBy, truncate } from 'lodash'
import cn from 'classnames'

import theme from '../styles/theme'
import Layout from '../components/layout'
import { getInfo, getPosts, TPostData, TInfoData } from '../lib/api'
import { getPostLink } from '../lib/utils'

const getStaticProps: GetStaticProps<{ posts: TPostData[]; info: TInfoData }> = async ({
  locale,
}) => {
  const posts = await getPosts({ locale })
  const info = await getInfo({ locale })
  const messages = require(`../locales/${locale}.json`)
  return { props: { posts, info, messages } }
}

const SectionTitle = s.h2({
  font: `600 3.3rem ${theme.fonts.exo2}`,
  letterSpacing: '.11em',
  textTransform: 'uppercase',
  textAlign: 'center',
})

const PostTitle = s.a({
  display: 'inline-block',
  fontStyle: 'italic',
  fontWeight: 'bold',
  lineHeight: 1.3,
  fontFamily: theme.fonts.openSans,
  textTransform: 'uppercase',
  letterSpacing: '.1em',
  color: theme.colors.yellow1,
  cursor: 'pointer',
  ':hover, &.--hovered': { textDecoration: 'underline', color: theme.colors.yellow1 },
})

const PostImage = s.div({
  background: '#e6d95a',
  cursor: 'pointer',
  '> *': { display: 'block !important', transition: 'all .1s' },
  ':hover > *, &.--hovered > *': { transform: 'translate(0.3em, -0.3em)' },
})

const Date = s.span({
  font: `1.1rem ${theme.fonts.openSans}`,
  color: theme.colors.gray,
  letterSpacing: '.04em',
})

const HeroPost: FC<{ post: TPostData }> = ({ post }) => {
  const href = useMemo(() => getPostLink(post), [post])
  const [isHovered, setIsHovered] = useState(false)
  const onHover = useMemo(() => {
    return {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    }
  }, [])
  return (
    <div css={{ fontSize: '2rem' }}>
      <Link href={href}>
        <PostImage className={cn({ '--hovered': isHovered })} title={post.title} {...onHover}>
          <Image src={post.poster.url} width={1280} height={720} />
        </PostImage>
      </Link>
      <div
        css={{
          width: '100%',
          height: '6.7rem',
          padding: '1.5rem 0 0 35%',
          textAlign: 'right',
          overflow: 'hidden',
        }}
      >
        <Link href={href}>
          <PostTitle className={cn({ '--hovered': isHovered })} title={post.title} {...onHover}>
            {truncate(post.title, { length: 55 })}
          </PostTitle>
        </Link>
      </div>
    </div>
  )
}

const FeaturedPost: FC<{ post: TPostData }> = ({ post }) => {
  const href = useMemo(() => getPostLink(post), [post])
  const [isHovered, setIsHovered] = useState(false)
  const onHover = useMemo(() => {
    return {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    }
  }, [])
  return (
    <div css={{ fontSize: '1.4rem' }}>
      <Link href={href}>
        <PostImage className={cn({ '--hovered': isHovered })} title={post.title} {...onHover}>
          <Image src={post.poster.url} width={1280} height={720} layout='responsive' />
        </PostImage>
      </Link>
      <div
        css={{
          width: '100%',
          height: '7rem',
          textAlign: 'center',
          padding: '1.5rem',
          overflow: 'hidden',
        }}
      >
        <Link href={href}>
          <PostTitle className={cn({ '--hovered': isHovered })} title={post.title} {...onHover}>
            {truncate(post.title, { length: 50 })}
          </PostTitle>
        </Link>
      </div>
    </div>
  )
}

const LatestPost: FC<{ post: TPostData }> = ({ post }) => {
  const href = useMemo(() => getPostLink(post), [post])
  const [isHovered, setIsHovered] = useState(false)
  const onHover = useMemo(() => {
    return {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    }
  }, [])
  return (
    <div css={{ fontSize: '1.04rem', display: 'flex', alignItems: 'flex-start' }}>
      <Link href={href}>
        <PostImage
          className={cn({ '--hovered': isHovered })}
          title={post.title}
          {...onHover}
          css={{ width: '9rem', height: '9rem', flexShrink: 0 }}
        >
          <Image src={post.thumb.url} width={300} height={300} layout='responsive' />
        </PostImage>
      </Link>
      <div css={{ padding: '0.8rem 0 0 1.5rem', display: 'flex', flexDirection: 'column' }}>
        <Link href={href}>
          <PostTitle
            className={cn({ '--hovered': isHovered })}
            title={post.title}
            {...onHover}
            css={{
              width: '100%',
              maxHeight: '4.8rem',
              overflow: 'hidden',
              fontStyle: 'normal',
              fontWeight: 'normal',
              color: '#a6a7a1',
              ':hover': { color: theme.colors.yellow1 },
            }}
          >
            {truncate(post.title, { length: 85 })}
          </PostTitle>
        </Link>
        <Date css={{ marginTop: '.8rem' }}>{post.created_at}</Date>
      </div>
    </div>
  )
}

const Home: FC<InferGetServerSidePropsType<typeof getStaticProps>> = ({ posts, info }) => {
  const t = useTranslations()

  const { hero, featured, latest } = useMemo(() => {
    const sorted = sortBy(posts, 'created_at').reverse()
    const allFeatured = filter(sorted, 'featured')
    const hero = allFeatured[0]
    const featured = allFeatured.slice(1, 5)
    const latest = difference(sorted, [hero, ...featured]).slice(0, 6)
    return { hero, featured, latest }
  }, [posts])

  return (
    <>
      <Head>
        <title>IRESTONE.SPACE</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Layout info={info}>
        <div
          css={{
            padding: '5rem 13rem',
            background: 'url("/frontpage.svg") top center / cover no-repeat',
            '> * + *': { marginTop: '5rem' },
          }}
        >
          <HeroPost post={hero} />
          <SectionTitle css={{ color: '#314046' }}>{t('featured')}</SectionTitle>
          <div css={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem 3.3rem' }}>
            {featured.map((post) => {
              return <FeaturedPost key={post.id} post={post} />
            })}
          </div>
          <SectionTitle css={{ color: '#c9d2cc' }}>{t('latest')}</SectionTitle>
          <div css={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '3.3rem' }}>
            {latest.map((post) => {
              return <LatestPost key={post.id} post={post} />
            })}
          </div>
        </div>
      </Layout>
    </>
  )
}

export { getStaticProps }
export default Home
