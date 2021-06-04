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
import FormattedDate from './formattedDate'

const Entry: FC<{ post: TPostData }> = ({ post }) => {
  const [isHovered, setIsHovered] = useState(false)
  const onHover = useMemo(() => {
    return {
      onMouseEnter: () => setIsHovered(true),
      onMouseLeave: () => setIsHovered(false),
    }
  }, [])
  const theme = useTheme()
  const href = getPostLink(post)
  return (
    <div css={{ color: '#ececec' }}>
      <Link href={href}>
        <div
          className={cn({ '--hovered': isHovered })}
          css={{
            cursor: 'pointer',
            border: '1rem solid #4f5758',
            ':hover, &.--hovered': { borderColor: '#ffcf76' },
            '> *': { display: 'block !important', border: '1px solid #515f56' },
          }}
          {...onHover}
        >
          <Image src={post.poster.url} width={1280} height={720} alt={post.title} />
        </div>
      </Link>
      <div css={{ marginTop: '1rem', display: 'flex', alignItems: 'center' }}>
        <Icon
          calendar
          css={{ with: '1.3rem', height: '1.3rem', fill: '#839496', marginRight: '.7rem' }}
        />
        <FormattedDate date={post.created_at} css={{ fontSize: '1.2rem', color: '#939fa0' }} />
      </div>
      <h2
        css={{
          fontFamily: theme.fonts.exo2,
          fontSize: '2.3rem',
          lineHeight: 1.3,
          textTransform: 'uppercase',
          margin: '1rem 0 0',
        }}
      >
        <Link href={href}>
          <a
            className={cn({ '--hovered': isHovered })}
            css={{
              ':hover, &.--hovered': {
                textDecoration: 'underline',
                color: '#ffcf76',
                cursor: 'pointer',
              },
            }}
            {...onHover}
          >
            {post.title}
          </a>
        </Link>
      </h2>
      <div css={{ marginTop: '-0.4rem' }}>
        <Icon
          quote
          css={{
            with: '1.3rem',
            height: '1.3rem',
            fill: '#839496',
            marginRight: '.7rem',
            float: 'left',
            marginTop: '.4rem',
          }}
        />
        <p css={{ fontSize: '1.4rem', color: '#c4cccc' }}>{post.excerpt}</p>
      </div>
    </div>
  )
}

const Category: FC<{ title: string; posts: TPostData[] }> = ({ title, posts }) => {
  const theme = useTheme()
  const sortedPosts = useMemo(() => sortBy(posts, 'created_at').reverse(), [posts])
  return (
    <div css={{ padding: '5rem 13rem' }}>
      <h1
        css={{
          fontFamily: theme.fonts.exo2,
          fontWeight: 'bold',
          lineHeight: 1.3,
          letterSpacing: '.03em',
          textTransform: 'uppercase',
          fontSize: '2.5em',
          color: '#ececec',
          margin: 0,
        }}
      >
        {title}
      </h1>
      <ul css={{ marginTop: '5rem', 'li + li': { marginTop: '5rem' } }}>
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
