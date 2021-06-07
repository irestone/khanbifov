/** @jsxImportSource @emotion/react */

import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import { sortBy } from 'lodash'
import Image from 'next/image'
import cn from 'classnames'
import { useTheme } from '@emotion/react'

import { TPostData } from '../lib/api'
import { getPostLink } from '../lib/utils'
import Icon from './Icon'
import MetaDate from './metaDate'
import MetaTag from './metaTag'

const Entry: FC<{ post: TPostData }> = ({ post }) => {
  const theme = useTheme()
  const href = getPostLink(post)
  const [isHovered, setIsHovered] = useState(false)
  const onHover = useMemo(() => {
    return {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    }
  }, [])

  const posterJSX = (
    <Link href={href}>
      <a
        className={cn({ '--hovered': isHovered })}
        css={{
          display: 'block',
          border: '1rem solid #4f5758',
          cursor: 'pointer',
          ':hover, &.--hovered': { borderColor: '#ffcf76' },
          '> *': { display: 'block !important', border: '1px solid #515f56' },
        }}
        {...onHover}
      >
        <Image src={post.poster.url} alt={post.title} width={1280} height={720} />
      </a>
    </Link>
  )

  const metaJSX = (
    <div
      css={{
        display: 'flex',
        justifyContent: 'space-between',
        fontSize: '1rem',
        marginTop: '1.4rem',
      }}
    >
      <MetaDate date={post.created_at} />
      <ul css={{ display: 'flex', '> li + li': { marginLeft: '1rem' } }}>
        {post.tags.map((tag) => {
          return (
            <li key={tag}>
              <MetaTag tag={tag} />
            </li>
          )
        })}
      </ul>
    </div>
  )

  const titleJSX = (
    <Link href={href}>
      <a
        className={cn({ '--hovered': isHovered })}
        css={{
          display: 'inline-block',
          font: `bold 2.3rem/1.3 ${theme.fonts.exo2}`,
          textTransform: 'uppercase',
          color: '#ececec',
          cursor: 'pointer',
          marginTop: '1.4rem',
          ':hover, &.--hovered': { textDecoration: 'underline', color: '#ffcf76' },
        }}
        {...onHover}
      >
        {post.title}
      </a>
    </Link>
  )

  const excerptJSX = (
    <div css={{ marginTop: '1.4rem' }}>
      <Icon
        quote
        css={{
          with: '1.2rem',
          height: '1.2rem',
          fill: '#839496',
          float: 'left',
          margin: '.4rem .7rem 0 0',
        }}
      />
      <p css={{ fontSize: '1.4rem', color: '#c4cccc' }}>{post.excerpt}</p>
    </div>
  )

  return (
    <article>
      {posterJSX}
      {metaJSX}
      {titleJSX}
      {excerptJSX}
    </article>
  )
}

const Category: FC<{ title: string; posts: TPostData[] }> = ({ title, posts }) => {
  const theme = useTheme()
  const sortedPosts = useMemo(() => sortBy(posts, 'created_at').reverse(), [posts])
  return (
    <div css={{ padding: '5rem 13rem' }}>
      <h1
        css={{
          font: `bold 4rem/1.3 ${theme.fonts.exo2}`,
          textTransform: 'uppercase',
          letterSpacing: '.03em',
          color: '#ececec',
        }}
      >
        {title}
      </h1>
      <ul css={{ marginTop: '5rem', '> li + li': { marginTop: '5rem' } }}>
        {sortedPosts.map((post) => {
          return (
            <li key={post.id}>
              <Entry post={post} />
            </li>
          )
        })}
      </ul>
    </div>
  )
}

export default Category
