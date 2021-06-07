import qs from 'qs'

import { TPostData, TCategory } from './api'

const categoryNamesMapping: { [category in TCategory]: string } = {
  work: 'works',
  experiment: 'experiments',
  blog: 'blog',
}

// todo: research on better upproach to constract links

const getPostLink = ({ category, slug }: TPostData) => {
  return `/${categoryNamesMapping[category]}/${slug}`
}

const getCategoryLink = (category: TCategory, query: any) => {
  const url = `/${categoryNamesMapping[category]}`
  const queryString = qs.stringify(query, { arrayFormat: 'repeat' })
  return queryString ? `${url}?${queryString}` : url
}

export { getPostLink, getCategoryLink, categoryNamesMapping }
