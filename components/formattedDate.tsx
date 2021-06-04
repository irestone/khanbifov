/** @jsxImportSource @emotion/react */

import { ClassAttributes, FC, HTMLAttributes, useMemo } from 'react'
import { Interpolation, Theme } from '@emotion/react'
import { format as formatDate } from 'date-fns'
import { useRouter } from 'next/dist/client/router'
import { Locale } from 'date-fns'
import { enUS, ru } from 'date-fns/locale'

const localesMapping: { [locale: string]: { locale: Locale; format: string } } = {
  en: { locale: enUS, format: 'MMMM d, yyyy' },
  ru: { locale: ru, format: 'd MMMM, yyyy' },
}

const FormattedDate: FC<
  { date: string | number | Date } & ClassAttributes<HTMLSpanElement> &
    HTMLAttributes<HTMLSpanElement> & { css?: Interpolation<Theme> }
> = ({ date, ...props }) => {
  const router = useRouter()

  const { format, locale } = useMemo(() => {
    if (!router.locale) throw new Error('Unexpected')
    return localesMapping[router.locale]
  }, [router.locale])

  const formattedDate = useMemo(
    () => formatDate(new Date(date), format, { locale }),
    [date, format, locale]
  )

  return <span {...props}>{formattedDate}</span>
}

export default FormattedDate
