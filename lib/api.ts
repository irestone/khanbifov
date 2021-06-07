import Axios from 'axios'

interface TGQLResponse<T = any> {
  data?: T
  error?: any
}

const apiURL = `${process.env.STRAPI_API_URL}/graphql`

const get = async <T = any>(query: string, variables: { [name: string]: any }) => {
  const { data } = await Axios.post<TGQLResponse<T>>(apiURL, { query, variables })
  if (data.error || !data.data) throw new Error('Error fetching data')
  return data.data
}

// section #####################################################################
//  API
// #############################################################################

// part ================================
//  INFO
// =====================================

type TGetInfoParams = { locale?: string }
type TGetInfoResponse = { info: TInfoData }
type TInfoData = {
  location: string
  email: string
  twitter: string
  github: string
  linkedin: string
}

const infoQuery = `
  query Info($locale: String) {
    info(locale: $locale) {
      location
      email
      twitter
      github
      linkedin
    }
  }
`

const getInfo = async (params: TGetInfoParams) => {
  const { info } = await get<TGetInfoResponse>(infoQuery, params)
  return info
}

// part ================================
//  ABOUT
// =====================================

type TGetAboutPageParams = { locale?: string }
type TAboutPageResponse = { about: TAboutPageData }
type TAboutPageData = { photo: { url: string }; body: string }

const aboutPageQuery = `
  query About($locale: String) {
    about(locale: $locale) {
      photo {
        url
      }
      body
    }
  }
`
const getAboutPage = async (params: TGetAboutPageParams) => {
  const { about } = await get<TAboutPageResponse>(aboutPageQuery, params)
  return about
}

// part ================================
//  POSTS
// =====================================

type TGetPostsParams = { locale?: string; where?: { [key: string]: any } }
type TGetPostsResponse = { posts: TPostData }
type TCategory = 'work' | 'experiment' | 'blog'
type TPostData = {
  id: string
  created_at: string
  poster: { url: string }
  thumb: { url: string }
  title: string
  slug: string
  body: string
  excerpt: string
  category: TCategory
  locale: string
  featured: boolean
  tags: string[]
}

const postsQuery = `
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
        tags
      }
    }
  `

const getPosts = async (params: TGetPostsParams) => {
  const { posts } = await get<TGetPostsResponse>(postsQuery, params)
  return posts
}

// section #####################################################################
//  EXPORT
// #############################################################################

export type { TInfoData, TCategory, TPostData, TAboutPageData }
export { getInfo, getPosts, getAboutPage }
