/** @jsxImportSource @emotion/react */

import Head from 'next/head'
import { FC } from 'react'

import { TPostData } from '../lib/api'

const Post: FC<{ post: TPostData }> = ({
  post: { poster, title, body, category, tags, created_at },
}) => {
  return (
    <>
      <h1 css={{ margin: 0, textTransform: 'uppercase' }}>{title}</h1>
      <div css={{ marginTop: '3rem' }}>
        <img src={poster.url} alt={title} />
        <h3>{title}</h3>
        <div>{body}</div>
        <strong>{category}</strong>
        <br />
        <small>{tags.map((tag) => `#${tag}`).join(' ')}</small>
        <br />
        <small>{created_at}</small>
      </div>
    </>
  )
}

export default Post
