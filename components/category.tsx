/** @jsxImportSource @emotion/react */

import Link from 'next/link'
import { FC } from 'react'

import { TPostCategory, TPostData } from '../lib/api'
import { getPostLink, categoryNamesMapping } from '../lib/utils'

// todo: theme config
const red = '#cf2525'
// const red = '#91271a'
const black = '#222'
const white = '#f1f1f1'

const Category: FC<{ name: TPostCategory; posts: TPostData[] }> = ({ name, posts }) => {
  const tag = 'design'
  return (
    <>
      <div css={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h1 css={{ margin: 0, textTransform: 'uppercase' }}>{categoryNamesMapping[name]}</h1>
        <div css={{ display: 'flex', alignItems: 'center' }}>
          <div
            css={{
              display: 'flex',
              '> *': {
                display: 'block',
                fontSize: '0.7rem',
                marginLeft: '0.5rem',
                cursor: 'pointer',
                padding: '0.2em 0.4em',
                borderRadius: '1px',
                color: black,
                textTransform: 'uppercase',
                ':hover': {
                  background: black,
                  color: white,
                },
                '&.--active': {
                  background: red,
                  color: white,
                },
              },
            }}
          >
            {[
              ['dev', 12],
              ['design', 7],
              ['threejs', 5],
              ['art', 2],
            ].map(([name, count]) => {
              return (
                <span className={`${name === tag ? '--active' : ''}`}>{`#${name} (${count})`}</span>
              )
            })}
          </div>
          <div
            css={{
              display: 'flex',
              marginLeft: '1rem',
              '> *': {
                display: 'block',
                padding: 0,
                margin: 0,
                width: '1.2rem',
                height: '1.2rem',
              },
            }}
          >
            <button>{`<`}</button>
            <button>{`>`}</button>
          </div>
        </div>
      </div>
      <div css={{ marginTop: '3rem' }}>
        {posts.map((post) => {
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
    </>
  )
}

export default Category
