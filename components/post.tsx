/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import Image from 'next/image'
import { FC } from 'react'

import { TPostData } from '../lib/api'
import Markdown from './markdown'

const Post: FC<{ post: TPostData }> = ({ post }) => {
  const theme = useTheme()
  return (
    <div>
      <div css={{ borderBottom: '1px solid #515f56', '> *': { display: 'block !important' } }}>
        <Image src={post.poster.url} alt={post.title} width={1280} height={720} />
      </div>
      <div css={{ padding: '5rem 13rem', borderTop: '1rem solid #4f5758' }}>
        <h1
          css={{
            fontFamily: theme.fonts.exo2,
            fontWeight: 'bold',
            lineHeight: 1.3,
            letterSpacing: '.03em',
            textTransform: 'uppercase',
            fontSize: '2.5em',
            margin: '0 0 3.3rem',
            color: '#ececec',
          }}
        >
          {post.title}
        </h1>
        <Markdown>{post.body}</Markdown>
        <div css={{ marginTop: '5rem', fontSize: '1.2rem', color: '#839092' }}>
          {post.created_at}
        </div>
      </div>
    </div>
  )
}

export default Post
