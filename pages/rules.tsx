import { Box } from '@chakra-ui/react'
import { AppHead, Layout, AppText } from 'components'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { Color } from 'theme'
import { getLanguageHeaders } from 'utils'

export default function Index() {
  const t1 = useTranslation('common')
  const t2 = useTranslation('rules')

  return (
    <>
      <AppHead
        icon="/assets/common/logo.svg"
        url={`${process.env.NEXT_PUBLIC_BASE_URL}`}
        name={t2.t('rules:page_title')}
        description={t2.t('rules:page_description')}
        themeColor={Color.blueMain}
        author={t1.t('common:head_initor')}
        keywords={t2.t('rules:page_keywords')}
        language={t1.t('common:language')}
      />
      <Layout>
        <Box>
          <AppText>Ici c'est les regles des jeux</AppText>
        </Box>
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(getLanguageHeaders(context), [
        'common',
        'rules',
      ])),
    },
  }
}
