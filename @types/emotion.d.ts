import React from 'react'
import '@emotion/react'

import theme from '../styles/theme'

declare module '@emotion/react' {
  type InferredThemeType = typeof theme
  export interface Theme extends InferredThemeType {}
}
