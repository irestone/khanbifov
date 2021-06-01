import { css } from '@emotion/react'
import theme from './theme'

const { fonts, fallbackFont } = theme

const global = css({
  body: {
    fontFamily: `${fonts.openSans}, ${fallbackFont}`,
    fontSize: '1.6rem',
  },
})

export default global
