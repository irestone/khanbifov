/** @jsxImportSource @emotion/react */

import { FC } from 'react'

import Icon from './Icon'
import FormattedDate from './formattedDate'

const MetaDate: FC<{ date: string | number | Date }> = ({ date }) => {
  return (
    <span css={{ display: 'flex', alignItems: 'center' }}>
      <Icon
        calendar
        css={{ with: '1.2em', height: '1.2em', fill: '#839496', marginRight: '.7em' }}
      />
      <FormattedDate
        date={date}
        css={{ fontSize: '1.1em', color: '#939fa0', textTransform: 'uppercase' }}
      />
    </span>
  )
}

export default MetaDate
