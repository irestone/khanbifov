import { css } from '@emotion/react'

const reset = css({
  '*, *:before, *:after': { boxSizing: 'border-box' },
  html: { fontFamily: 'sans-serif', fontSize: 10, lineHeight: 1.6 },
  body: { padding: 0, margin: 0 },
  a: { color: 'inherit', textDecoration: 'none' },
  'h1, h2, h3, h4, h5, h6': { margin: 0 },
  button: {
    fontSize: 'inherit',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    width: 'auto',
    height: '1.6em',
    lineHeight: '1.6em',
    padding: '0 0.5em',
    border: 0,
    background: '#eaeaea',
    cursor: 'pointer',
  },
  img: { maxWidth: '100%', display: 'block' },
})

export default reset
