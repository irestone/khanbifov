/** @jsxImportSource @emotion/react */

import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import { FC } from 'react'

import { getPosts, TPostData } from '../lib/api'
import Layout from '../components/layout'
import Category from '../components/category'

const getStaticProps: GetStaticProps<{ posts: TPostData[] }> = async ({ locale }) => {
  const posts = await getPosts({ locale, where: { category: 'blog' } })
  return { props: { posts } }
}

const Blog: FC<InferGetServerSidePropsType<typeof getStaticProps>> = ({ posts }) => {
  return (
    <>
      <Head>
        <title>IRESTONE.SPACE | Blog</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Layout>
        <Category name='blog' posts={posts} />
      </Layout>
    </>
  )
}

export { getStaticProps }
export default Blog