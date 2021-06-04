/** @jsxImportSource @emotion/react */

import { FC } from 'react'
import { GetStaticProps, InferGetServerSidePropsType } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import { useTranslations } from 'use-intl'

import { getAboutPage, getInfo, TAboutPageData, TInfoData } from '../lib/api'
import Layout from '../components/layout'
import Markdown from '../components/markdown'
import Icon from '../components/Icon'

const getStaticProps: GetStaticProps<{ about: TAboutPageData; info: TInfoData }> = async ({
  locale,
}) => {
  const about = await getAboutPage({ locale })
  const info = await getInfo({ locale })
  const messages = require(`../locales/${locale}.json`)
  return { props: { about, info, messages }, revalidate: 1 }
}

const About: FC<InferGetServerSidePropsType<typeof getStaticProps>> = ({ about, info }) => {
  const t = useTranslations()
  return (
    <>
      <Head>
        <title>IRESTONE.SPACE | {t('Khan Bifov')}</title>
        <meta name='description' content='Generated by create next app' />
      </Head>
      <Layout info={info}>
        <div
          css={{
            display: 'grid',
            gridTemplateColumns: '40% 1fr',
            columnGap: '5rem',
            padding: '5rem 13rem',
            '::after': { content: '""', display: 'table', clear: 'both' },
          }}
        >
          <div>
            <div
              css={{
                width: '100%',
                height: 'fit-content',
                border: '1rem solid #f6e4d0',
                '> *': { display: 'block !important' },
              }}
            >
              <Image src={about.photo.url} width={750} height={1000} layout='responsive' />
            </div>
            <ul
              css={{
                marginTop: '1em',
                fontSize: '.9em',
                color: '#ececec',
                li: { display: 'flex', alignItems: 'center' },
                a: { color: '#ffcf76', ':hover': { textDecoration: 'underline' } },
                '.icon': { width: '1em', height: '1em', fill: '#839496', marginRight: '.4em' },
              }}
            >
              <li>
                <Icon location />
                <span>{info.location}</span>
              </li>
              <li>
                <Icon email />
                <a href={`mailto:${info.email}`}>{info.email}</a>
              </li>
              <li>
                <Icon twitter />
                {/* todo: extract usernames from links */}
                <a href={info.twitter}>@khanbifov</a>
              </li>
              <li>
                <Icon linkedin />
                <a href={info.linkedin}>in/khanbifov</a>
              </li>
              <li>
                <Icon github />
                <a href={info.github}>@irestone</a>
              </li>
            </ul>
          </div>
          <Markdown>{about.body}</Markdown>
        </div>
      </Layout>
    </>
  )
}

export { getStaticProps }
export default About
