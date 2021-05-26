import Axios from 'axios'

// const url = `${process.env.STRAPI_API_URL}/graphql`

interface TGQLResponse<T = any> {
  data?: T
  error?: any
}

const request = <T = any>(query: string, variables: { [name: string]: any }) => {
  return Axios.post<TGQLResponse<T>>(`${process.env.STRAPI_API_URL}/graphql`, { query, variables })
}

// section #####################################################################
//  "ABOUT" PAGE
// #############################################################################

type TGetAboutPageParams = { locale?: string }
type TAboutPageData = {
  photo: {
    url: string
  }
  title: string
  body: string
}

const getAboutPage = async (params: TGetAboutPageParams) => {
  const query = `
    query About($locale: String) {
      about(locale: $locale) {
        photo {
          url
        }
        title
        body
      }
    }
  `
  const res = await request<{ about: TAboutPageData }>(query, params)
  if (res.data.error || !res.data.data) throw new Error('Error fetching "About" page')
  return res.data.data.about
}

// section #####################################################################
//  POSTS
// #############################################################################

type TPostCategory = 'work' | 'experiment' | 'blog'

type TPostData = {
  id: string
  created_at: string
  poster: { url: string }
  title: string
  slug: string
  body: string
  category: TPostCategory
  tags: string[]
  locale: string
}

type TGetPostsParams = { locale?: string; where?: { [key: string]: any } }
const getPosts = async (params: TGetPostsParams) => {
  const query = `
    query Posts($locale: String, $where: JSON) {
      posts(locale: $locale, where: $where) {
        id
        created_at
        poster {
          url
        }
        title
        body
        category
        slug
        tags
        locale
      }
    }
  `
  const res = await request<{ posts: TPostData[] }>(query, params)
  if (res.data.error || !res.data.data) throw new Error('Error fetching posts')
  return res.data.data.posts
}

export type { TPostCategory, TPostData, TAboutPageData }
export { getPosts, getAboutPage }
