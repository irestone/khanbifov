import { css } from '@emotion/react'
import theme from './theme'

const urls = [
  'https://fonts.googleapis.com/css2?family=Exo+2:wght@600;700&family=Open+Sans:ital@0;1&display=swap',
]

const imports = css({ '@import': urls.map((url) => `url("${url}")`) })

export default imports
