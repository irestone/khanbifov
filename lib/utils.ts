import { TPostData, TPostCategory } from './api'

const categoryNamesMapping: { [category in TPostCategory]: string } = {
  work: 'works',
  experiment: 'experiments',
  blog: 'blog',
}

// todo: research on how to form links better
const getPostLink = ({ category, slug }: TPostData) => {
  return `/${categoryNamesMapping[category]}/${slug}`
}

export { getPostLink, categoryNamesMapping }
