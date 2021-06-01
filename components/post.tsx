/** @jsxImportSource @emotion/react */

import Image from 'next/image'
import { FC } from 'react'

import { TPostData } from '../lib/api'

const Post: FC<{ post: TPostData }> = ({ post }) => {
  return (
    <div>
      <Image src={post.poster.url} width={1280} height={720} alt={post.title} />
      <h1 css={{ margin: 0, textTransform: 'uppercase' }}>{post.title}</h1>
      <div>{post.created_at}</div>
      <div>{post.body}</div>
    </div>
  )
}

export default Post
