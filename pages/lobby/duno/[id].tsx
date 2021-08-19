import { Box } from '@chakra-ui/react'
import { AppHead, AppInterface, AppText } from 'components'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useObjectVal } from 'react-firebase-hooks/database'
import { Color } from 'theme'
import { DunoSettingLobby } from 'types'
import { getLanguageHeaders, Rdb } from 'utils'

export default function Index({ lobbyID }) {
  const t1 = useTranslation('common')
  const t2 = useTranslation('init')

  const [lobby, loadinglobby, errorlobby] = useObjectVal<DunoSettingLobby>(
    Rdb.ref(`lobby/${lobbyID}`),
  )

  return (
    <>
      <AppHead
        icon="/assets/common/logo.svg"
        url={`${process.env.NEXT_PUBLIC_BASE_URL}`}
        name={t2.t('init:page_title')}
        description={t2.t('init:page_description')}
        themeColor={Color.blueMain}
        author={t1.t('common:head_initor')}
        keywords={t2.t('init:page_keywords')}
        language={t1.t('common:language')}
      />
      <AppInterface t={t1.t}>
        {loadinglobby ? (
          <AppText>Loading...</AppText>
        ) : (
          <Box width={['90%', '90%', '90%', '90%']}>
            <AppText>{lobby.room_name}</AppText>
          </Box>
        )}
      </AppInterface>
    </>
  )
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(getLanguageHeaders(context), [
        'common',
        'init',
      ])),
      lobbyID: context.query.id,
    },
  }
}
