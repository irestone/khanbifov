/** @jsxImportSource @emotion/react */

import cn from 'classnames'
import { useRouter } from 'next/dist/client/router'
import Link from 'next/link'
import { FC, useCallback, useMemo } from 'react'
import {
  chunk,
  compact,
  countBy,
  filter,
  identity,
  inRange,
  intersection,
  isEmpty,
  isUndefined,
  map,
  omit,
  range,
  sortBy,
  xor,
} from 'lodash'

import { TPostCategory, TPostData } from '../lib/api'
import { getPostLink, getCategoryLink, categoryNamesMapping } from '../lib/utils'
import { useTranslations } from 'use-intl'

const POSTS_COUNT_PER_PAGE = 3

// todo: come up with a better idea on how to manage routing for pages and tags

const red = '#cf2525'
// const red = '#91271a'
const black = '#222'
const white = '#f1f1f1'

const Category: FC<{ name: TPostCategory; posts: TPostData[] }> = ({ name, posts }) => {
  const t = useTranslations()
  const router = useRouter()

  const tags = useMemo(() => {
    const allTags = posts.map(({ tags }) => tags).flat()
    const withCounts = map(countBy(allTags, identity), (count, tag) => [tag, count])
    return withCounts
  }, [posts])

  const queriedTags = useMemo(() => compact([router.query.tag]).flat(), [router.query.tag])

  const toggleTag = useCallback(
    (tag) => {
      const link = getCategoryLink(name, { tag: xor(queriedTags, [tag]) })
      router.push(link)
    },
    [queriedTags]
  )

  const filteredPosts = useMemo(() => {
    const filtered = isEmpty(queriedTags)
      ? posts
      : filter(posts, ({ tags }) => !isEmpty(intersection(tags, queriedTags)))
    return sortBy(filtered, 'created_at').reverse()
  }, [posts, queriedTags])

  const postsPerPage = useMemo(() => {
    return chunk(filteredPosts, POSTS_COUNT_PER_PAGE)
  }, [filteredPosts])

  const currentPage = useMemo(() => {
    const [queriedPage] = [router.query.page].flat()
    if (isUndefined(queriedPage)) return 1
    if (isNaN(+queriedPage) || !inRange(+queriedPage, 1, postsPerPage.length + 1)) {
      router.push(getCategoryLink(name, omit(router.query, 'page')))
      return 1
    }
    return +queriedPage
  }, [router.query, postsPerPage.length])

  const postsForCurrentPage = useMemo(() => {
    return postsPerPage[currentPage - 1] || []
  }, [postsPerPage, currentPage])

  const pagination = useMemo(() => {
    if (postsPerPage.length < 2) return null
    // todo: proper pagination w/ limited buttons, first and last pages
    const buttons = range(postsPerPage.length).map((i) => {
      const page = i + 1
      const query = page === 1 ? omit(router.query, 'page') : { ...router.query, page }
      return (
        <Link key={page} href={getCategoryLink(name, query)}>
          <button className={cn({ '--active': page === currentPage })}>{page}</button>
        </Link>
      )
    })
    return (
      <div
        css={{
          marginTop: '5rem',
          display: 'flex',
          justifyContent: 'center',
          '> *': {
            margin: 0,
            padding: 0,
            background: 'none',
            border: 'none',
            width: '1.5rem',
            height: '1.5rem',
            color: black,
            cursor: 'pointer',
            ':hover': { background: black, color: white },
            '&.--active': { background: red, color: white },
          },
          '> * + *': { marginLeft: '.5rem' },
        }}
      >
        {buttons}
      </div>
    )
  }, [postsPerPage, router.query, currentPage])

  const clearTags = useCallback(() => {
    router.push(getCategoryLink(name, omit(router.query, ['tag', 'page'])))
  }, [router.push, router.query, name])

  const tagsFilter = useMemo(() => {
    const MAIN_TAGS_LIMIT = 5
    const tagsSortedByCount = sortBy(tags, '1').reverse()
    const tagButtons = tagsSortedByCount.map(([tag, count]) => {
      return (
        <button
          key={tag}
          onClick={() => toggleTag(tag)}
          className={cn({ '--active': queriedTags.includes(String(tag)) })}
          css={{
            textTransform: 'uppercase',
            whiteSpace: 'nowrap',
            width: 'auto',
            padding: '0.2em 0.4em',
            background: 'none',
            color: black,
            cursor: 'pointer',
            ':hover': { background: black, color: white },
            '&.--active': { background: red, color: white },
          }}
        >{`#${tag} (${count})`}</button>
      )
    })
    const mainTags = tagButtons.slice(0, MAIN_TAGS_LIMIT)
    const restTags = tagButtons.slice(MAIN_TAGS_LIMIT)
    return (
      <div css={{ display: 'flex', alignItems: 'center', fontSize: '.7rem' }}>
        {queriedTags.length > 0 && (
          <button
            onClick={clearTags}
            css={{
              width: '1.6em',
              height: '1.6em',
              padding: 0,
              background: 'none',
              marginRight: '.5rem',
              ':hover': { background: red, color: white },
            }}
          >
            -
          </button>
        )}
        <div css={{ display: 'flex', '> button + button': { marginLeft: '0.5rem' } }}>
          {mainTags}
        </div>
        {!isEmpty(restTags) && (
          <div css={{ position: 'relative', ':hover > .tag-list': { display: 'block' } }}>
            <button
              css={{
                width: '1.6em',
                height: '1.6em',
                padding: 0,
                background: 'none',
                marginLeft: '.5rem',
              }}
            >
              +
            </button>
            <div
              className='tag-list'
              css={{
                display: 'none',
                position: 'absolute',
                right: 0,
                '> button': { background: 'white', margin: '0.5rem 0 0 auto' },
              }}
            >
              {restTags}
            </div>
          </div>
        )}
      </div>
    )
  }, [tags])

  return (
    <>
      <div css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 css={{ margin: 0, textTransform: 'uppercase' }}>{t(categoryNamesMapping[name])}</h1>
        {tagsFilter}
      </div>
      <div css={{ marginTop: '3rem' }}>
        {postsForCurrentPage.map((post) => {
          const { id, poster, title, body, category, tags, created_at } = post
          return (
            <div key={id}>
              <img src={poster.url} alt={title} />
              <Link href={getPostLink(post)}>
                <a
                  css={{
                    margin: 0,
                    color: 'black',
                    fontSize: '1.3rem',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                  }}
                >
                  {title}
                </a>
              </Link>
              <div>{body}</div>
              <strong>{category}</strong>
              <br />
              <small>{tags.map((tag) => `#${tag}`).join(' ')}</small>
              <br />
              <small>{created_at}</small>
            </div>
          )
        })}
      </div>
      {pagination}
    </>
  )
}

export default Category
