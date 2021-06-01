/** @jsxImportSource @emotion/react */

import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { FC, useMemo } from 'react'
import { chunk, inRange, isUndefined, omit, sortBy } from 'lodash'
import Image from 'next/image'

import { TPostCategory, TPostData } from '../lib/api'
import { getPostLink, getCategoryLink } from '../lib/utils'

const POSTS_COUNT_PER_PAGE = 100

const Post: FC<{ post: TPostData }> = ({ post }) => {
  const href = getPostLink(post)
  return (
    <div>
      <Link href={href}>
        <Image
          src={post.poster.url}
          width={1280}
          height={720}
          alt={post.title}
          css={{ cursor: 'pointer' }}
        />
      </Link>
      <Link href={href}>
        <a
          css={{
            fontSize: '2.3rem',
            fontWeight: 'bold',
            textTransform: 'uppercase',
            cursor: 'pointer',
            ':hover': { textDecoration: 'underline' },
          }}
        >
          {post.title}
        </a>
      </Link>
      <div>{post.created_at}</div>
      <div>{post.excerpt}</div>
    </div>
  )
}

const Category: FC<{ category: TPostCategory; posts: TPostData[] }> = ({ category, posts }) => {
  const router = useRouter()

  const postsPerPage = useMemo(() => {
    return chunk(sortBy(posts, 'created_at'), POSTS_COUNT_PER_PAGE)
  }, [posts])

  const currentPage = useMemo(() => {
    const [queriedPage] = [router.query.page].flat()
    if (isUndefined(queriedPage)) return 1
    if (isNaN(+queriedPage) || !inRange(+queriedPage, 1, postsPerPage.length + 1)) {
      router.push(getCategoryLink(category, omit(router.query, 'page')))
      return 1
    }
    return +queriedPage
  }, [router.query, postsPerPage.length])

  const postsForCurrentPage = useMemo(() => {
    return postsPerPage[currentPage - 1] || []
  }, [postsPerPage, currentPage])

  return (
    <div>
      <h1 css={{ textTransform: 'uppercase' }}>{category}</h1>
      {postsForCurrentPage.map((post) => {
        return <Post key={post.id} post={post} />
      })}
    </div>
  )
}

export default Category
