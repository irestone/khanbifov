/** @jsxImportSource @emotion/react */

import Link from 'next/link'
import { FC, useMemo, useState } from 'react'
import { sortBy } from 'lodash'
import Image from 'next/image'
import cn from 'classnames'

import { TPostData } from '../lib/api'
import { getPostLink } from '../lib/utils'
import { useTheme } from '@emotion/react'

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
            ':hover, &.--hovered': { borderColor: theme.colors.yellow1 },
            '> *': { display: 'block !important' },
          }}
          {...onHover}
        >
          <Image src={post.poster.url} width={1280} height={720} alt={post.title} />
        </div>
      </Link>
      <h2
        className={cn({ '--hovered': isHovered })}
        css={{
          fontFamily: theme.fonts.exo2,
          fontSize: '2.3rem',
          lineHeight: 1.3,
          textTransform: 'uppercase',
          margin: '1rem 0 0',
          cursor: 'pointer',
          ':hover, &.--hovered': { textDecoration: 'underline', color: theme.colors.yellow1 },
        }}
        {...onHover}
      >
        <Link href={href}>{post.title}</Link>
      </h2>
      <p css={{ fontSize: '1.4rem', margin: '1rem 0 0' }}>{post.excerpt}</p>
      <small css={{ fontSize: '1.2rem', display: 'block', marginTop: '1rem', color: '#97a4a7' }}>
        {post.created_at}
      </small>
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

// const POSTS_COUNT_PER_PAGE = 100

// const Category: FC<{ title: string; category: TPostCategory; posts: TPostData[] }> = ({
//   title,
//   category,
//   posts,
// }) => {
//   const router = useRouter()

//   const postsPerPage = useMemo(() => {
//     return chunk(sortBy(posts, 'created_at').reverse(), POSTS_COUNT_PER_PAGE)
//   }, [posts])

//   const currentPage = useMemo(() => {
//     const [queriedPage] = [router.query.page].flat()
//     if (isUndefined(queriedPage)) return 1
//     if (isNaN(+queriedPage) || !inRange(+queriedPage, 1, postsPerPage.length + 1)) {
//       router.push(getCategoryLink(category, omit(router.query, 'page')))
//       return 1
//     }
//     return +queriedPage
//   }, [router.query, postsPerPage.length])

//   const postsForCurrentPage = useMemo(() => {
//     return postsPerPage[currentPage - 1] || []
//   }, [postsPerPage, currentPage])

//   return (
//     <div>
//       <h1 css={{ textTransform: 'uppercase' }}>{category}</h1>
//       {postsForCurrentPage.map((post) => {
//         return <Entry key={post.id} post={post} />
//       })}
//     </div>
//   )
// }
