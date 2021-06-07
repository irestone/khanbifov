/** @jsxImportSource @emotion/react */

import { FC } from 'react'

import Icon from './Icon'

const MetaTag: FC<{ tag: string }> = ({ tag }) => {
  return (
    <span css={{ display: 'flex', alignItems: 'center' }}>
      <Icon hashtag css={{ width: '.9em', height: '.9em', fill: '#839496', marginRight: '.1em' }} />
      <span css={{ fontSize: '1.1em', color: '#939fa0', textTransform: 'uppercase' }}>{tag}</span>
    </span>
  )
}

export default MetaTag
