import Axios from 'axios'

const strapiGQLURL = `${process.env.STRAPI_API_URL}/graphql`

interface TGQLResponse<T = any> {
  data?: T
  error?: any
}

type TPostData = { slug: string }

const getPosts = async () => {
  const query = '{ posts { slug } }'
  const res = await Axios.post<TGQLResponse<{ posts: TPostData[] }>>(strapiGQLURL, { query })
  if (res.data.error || !res.data.data) throw new Error('Error fetching posts')
  return res.data.data.posts
}

export type { TPostData }
export { getPosts }
