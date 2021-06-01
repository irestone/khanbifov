import Axios from 'axios'

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
  body: string
}

const getAboutPage = async (params: TGetAboutPageParams) => {
  const query = `
    query About($locale: String) {
      about(locale: $locale) {
        photo {
          url
        }
        body
      }
    }
  `
  const res = await request<{ about: TAboutPageData }>(query, params)
  if (res.data.error || !res.data.data) throw new Error('Error fetching "About" page')
  return res.data.data.about
}

// section #####################################################################
//  INFO
// #############################################################################

type TGetInfoParams = { locale?: string }
type TInfoData = {
  email: string
  twitter: string
  github: string
  linkedin: string
}

const getInfo = async (params: TGetInfoParams) => {
  const query = `
    query Info {
      info {
        email
        twitter
        github
        linkedin
      }
    }
  `
  const res = await request<{ info: TInfoData }>(query, params)
  if (res.data.error || !res.data.data) throw new Error('Error fetching Info')
  return res.data.data.info
}

// section #####################################################################
//  POSTS
// #############################################################################

type TPostCategory = 'work' | 'experiment' | 'blog'

type TPostData = {
  id: string
  created_at: string
  poster: { url: string }
  thumb: { url: string }
  title: string
  slug: string
  body: string
  excerpt: string
  category: TPostCategory
  locale: string
  featured: boolean
}

type TGetPostsParams = { locale?: string; where?: { [key: string]: any } }
const getPosts = async (params: TGetPostsParams) => {
  const query = `
    query Posts($locale: String, $where: JSON) {
      posts(locale: $locale, where: $where) {
        id
        poster {
          url
        }
        thumb {
          url
        }
        title
        slug
        body
        excerpt
        category
        featured
        locale
        created_at
      }
    }
  `
  const res = await request<{ posts: TPostData[] }>(query, params)
  if (res.data.error || !res.data.data) throw new Error('Error fetching posts')
  return res.data.data.posts
}

export type { TInfoData, TPostCategory, TPostData, TAboutPageData }
export { getInfo, getPosts, getAboutPage }
