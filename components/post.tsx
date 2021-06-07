/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import Image from 'next/image'
import { FC } from 'react'

import { TPostData } from '../lib/api'
import Markdown from './markdown'
import MetaDate from './metaDate'
import MetaTag from './metaTag'

const Post: FC<{ post: TPostData }> = ({ post }) => {
  const theme = useTheme()

  const posterJSX = (
    <div css={{ borderBottom: '1px solid #515f56', '> *': { display: 'block !important' } }}>
      <Image src={post.poster.url} alt={post.title} width={1280} height={720} />
    </div>
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
    <h1
      css={{
        font: `bold 4rem/1.3 ${theme.fonts.exo2}`,
        textTransform: 'uppercase',
        letterSpacing: '.03em',
        color: '#ececec',
        marginTop: '5rem',
      }}
    >
      {post.title}
    </h1>
  )

  const bodyJSX = <Markdown style={{ marginTop: '5rem' }}>{post.body}</Markdown>

  return (
    <article>
      {posterJSX}
      <div css={{ padding: '0 13rem 5rem', borderTop: '1rem solid #4f5758' }}>
        {metaJSX}
        {titleJSX}
        {bodyJSX}
      </div>
    </article>
  )
}

export default Post
