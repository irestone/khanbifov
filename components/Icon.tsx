/** @jsxImportSource @emotion/react */

import { FC, SVGProps, useMemo } from 'react'

import twitter from '../public/icons/twitter.svg'
import github from '../public/icons/github.svg'
import linkedin from '../public/icons/linkedin.svg'
import email from '../public/icons/email.svg'
import location from '../public/icons/location.svg'
import globe from '../public/icons/globe.svg'
import calendar from '../public/icons/calendar.svg'
import quote from '../public/icons/quote.svg'
import hashtag from '../public/icons/hashtag.svg'

type TIconName =
  | 'twitter'
  | 'github'
  | 'linkedin'
  | 'email'
  | 'location'
  | 'globe'
  | 'calendar'
  | 'quote'
  | 'hashtag'

const icons: { [name in TIconName]: FC<SVGProps<SVGSVGElement>> } = {
  twitter,
  github,
  linkedin,
  email,
  location,
  globe,
  calendar,
  quote,
  hashtag,
}

const Icon: FC<{ [name in TIconName]?: boolean } & SVGProps<SVGSVGElement>> = ({
  location,
  email,
  twitter,
  github,
  linkedin,
  globe,
  calendar,
  quote,
  hashtag,
  ...props
}) => {
  const iconProps: { [name in TIconName]: boolean | undefined } = useMemo(
    () => ({
      location,
      email,
      twitter,
      github,
      linkedin,
      globe,
      calendar,
      quote,
      hashtag,
    }),
    [location, email, twitter, github, linkedin, globe]
  )
  const name = useMemo(() => {
    const [[name]] = Object.entries(iconProps).filter(([, v]) => Boolean(v))
    return name as TIconName
  }, [iconProps])
  const Component = useMemo(() => icons[name], [name])
  return Component ? <Component className={`icon ${name}`} {...props} /> : null
}

export default Icon
