/** @jsxImportSource @emotion/react */

import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import { useRouter } from 'next/dist/client/router'
import Head from 'next/head'
import { FC } from 'react'

import { getAboutPage, TAboutPageData } from '../lib/api'
import Layout from '../components/layout'

const getStaticProps: GetStaticProps<TAboutPageData> = async ({ locale }) => {
  const props = await getAboutPage({ locale })
  return { props }
}

const About: FC<InferGetServerSidePropsType<typeof getStaticProps>> = ({ title, body, photo }) => {
  const { locale } = useRouter()
  return (
    <>
      <Head>
        <title>IRESTONE.SPACE | Khan Bifov</title>
        <meta name='description' content='About Khan Bifov - web-developer and designer.' />
      </Head>
      <Layout>
        <img src={photo.url} alt={title} />
        <h3>{title}</h3>
        <div>{body}</div>
      </Layout>
    </>
  )
}

export { getStaticProps }
export default About
