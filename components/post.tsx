/** @jsxImportSource @emotion/react */

import { useTheme } from '@emotion/react'
import Image from 'next/image'
import { FC } from 'react'

import { TPostData } from '../lib/api'
import FormattedDate from './formattedDate'
import Icon from './Icon'
import Markdown from './markdown'

const Post: FC<{ post: TPostData }> = ({ post }) => {
  const theme = useTheme()
  return (
    <div>
      <div css={{ borderBottom: '1px solid #515f56', '> *': { display: 'block !important' } }}>
        <Image src={post.poster.url} alt={post.title} width={1280} height={720} />
      </div>
      <div css={{ padding: '5rem 13rem', borderTop: '1rem solid #4f5758' }}>
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <Icon
            calendar
            css={{ with: '1.3rem', height: '1.3rem', fill: '#839496', marginRight: '.7rem' }}
          />
          <FormattedDate date={post.created_at} css={{ fontSize: '1.2rem', color: '#939fa0' }} />
        </div>
        <h1
          css={{
            fontFamily: theme.fonts.exo2,
            fontWeight: 'bold',
            lineHeight: 1.3,
            letterSpacing: '.03em',
            textTransform: 'uppercase',
            fontSize: '2.5em',
            margin: '.5rem 0 5rem',
            color: '#ececec',
          }}
        >
          {post.title}
        </h1>
        <Markdown>{post.body}</Markdown>
      </div>
    </div>
  )
}

export default Post
