/** @jsxImportSource @emotion/react */

import { CSSProperties, FC } from 'react'
import { css, CSSObject, Interpolation, Theme, useTheme } from '@emotion/react'
import ReactMarkdown from 'react-markdown'
import gfm from 'remark-gfm'
import { Prism } from 'react-syntax-highlighter'
import { tomorrow } from 'react-syntax-highlighter/dist/cjs/styles/prism'
import {
  CodeComponent,
  HeadingComponent,
  NormalComponent,
  OrderedListComponent,
  TableCellComponent,
  UnorderedListComponent,
} from 'react-markdown/src/ast-to-react'

import theme from '../styles/theme'

const baseHeadingStyle: CSSProperties = {
  fontFamily: theme.fonts.exo2,
  fontWeight: 'bold',
  lineHeight: 1.3,
  letterSpacing: '.03em',
  textTransform: 'uppercase',
}

const h1: HeadingComponent = ({ children }) => {
  return <h1 css={{ ...baseHeadingStyle, fontSize: '2.5em', margin: '.4em 0' }}>{children}</h1>
}

const h2: HeadingComponent = ({ children }) => {
  return <h2 css={{ ...baseHeadingStyle, fontSize: '1.7em', margin: '.588em 0' }}>{children}</h2>
}

const h3: HeadingComponent = ({ children }) => {
  return <h3 css={{ ...baseHeadingStyle, fontSize: '1.2em', margin: '.833em 0' }}>{children}</h3>
}

const h4: HeadingComponent = ({ children }) => {
  return <h4 css={{ ...baseHeadingStyle, fontSize: '1em', margin: '1em 0' }}>{children}</h4>
}

const h5: HeadingComponent = ({ children }) => {
  return <h5 css={{ ...baseHeadingStyle, fontSize: '1em', margin: '1em 0' }}>{children}</h5>
}

const h6: HeadingComponent = ({ children }) => {
  return <h6 css={{ ...baseHeadingStyle, fontSize: '1em', margin: '1em 0' }}>{children}</h6>
}

const p: NormalComponent = ({ children }) => {
  const theme = useTheme()
  return <p css={{ fontSize: '1em', lineHeight: 1.6, margin: '1em 0' }}>{children}</p>
}

const a: NormalComponent = ({ children, href, title }: any) => {
  return (
    <a
      href={href}
      title={title}
      css={{ color: '#ffcf76', ':hover': { textDecoration: 'underline' } }}
    >
      {children}
    </a>
  )
}

const blockquote: NormalComponent = ({ children }) => {
  return (
    <blockquote
      css={{
        margin: '1em 0',
        padding: '1.4em 3.5em',
        borderLeft: '.715em solid #4f5758',
        '> *': {
          margin: 0,
          fontSize: '1.4em',
          fontWeight: 100,
          fontStyle: 'italic',
          letterSpacing: '.05em',
          lineHeight: '1.5',
        },
      }}
    >
      {children}
    </blockquote>
  )
}

const ul: UnorderedListComponent = ({ children }) => {
  return (
    <ul css={{ '> li': { listStyle: 'inside', '::marker': { marginRight: '3rem' } } }}>
      {children}
    </ul>
  )
}

const ol: OrderedListComponent = ({ children }) => {
  return <ol css={{ '> li': { listStyle: 'inside decimal' } }}>{children}</ol>
}

const table: NormalComponent = ({ children }) => {
  return <table css={{ borderSpacing: 0 }}>{children}</table>
}

const tbody: NormalComponent = ({ children }) => {
  return <tbody css={{ '> tr:nth-child(odd)': { background: '#4f5758' } }}>{children}</tbody>
}

const th: TableCellComponent = ({ children }) => {
  return (
    <th css={{ padding: '.3em 1em', fontWeight: 'bold', textTransform: 'uppercase' }}>
      {children}
    </th>
  )
}

const td: TableCellComponent = ({ children }) => {
  return <td css={{ padding: '.3em 1em' }}>{children}</td>
}

const hr: NormalComponent = () => {
  return <hr css={{ border: '1px solid #4f5758', margin: '5em 0' }} />
}

const code: CodeComponent = ({ node, inline, className, children, ...props }) => {
  if (inline) {
    return (
      <code {...props} css={{ padding: '.1em .3em', background: '#2d2d2d', fontSize: '.9em' }}>
        {children}
      </code>
    )
  }
  const match = /language-(\w+)/.exec(className || '')
  const language = match?.[1] ?? 'ts'
  return (
    <Prism
      language={language}
      style={tomorrow}
      PreTag='div'
      {...props}
      css={{ border: '.715em solid #4f5758' }}
    >
      {String(children).replace(/\n$/, '')}
    </Prism>
  )
}

const Markdown: FC<{ style?: CSSProperties }> = ({ children, style }) => {
  const theme = useTheme()
  return (
    <ReactMarkdown
      remarkPlugins={[gfm]}
      components={{
        h1,
        h2,
        h3,
        h4,
        h5,
        h6,
        p,
        a,
        blockquote,
        ul,
        ol,
        table,
        tbody,
        th,
        td,
        hr,
        code,
      }}
      css={{
        fontSize: '1.4rem',
        fontFamily: theme.fonts.openSans,
        color: '#ececec',
        textShadow: '-.1em .1em #00000017',
        ...style,
      }}
    >
      {String(children)}
    </ReactMarkdown>
  )
}

export default Markdown
