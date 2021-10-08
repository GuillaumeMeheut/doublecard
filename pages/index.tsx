import { Box } from '@chakra-ui/react'
import {
  AppButton,
  AppHead,
  AppInputSearch,
  AppInterface,
  AppText,
  LobbyCardDuno,
  ModalInit,
} from 'components'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useState } from 'react'
import { Color, Spaces } from 'theme'
import { getLanguageHeaders, Rdb } from 'utils'
import { useListVals } from 'react-firebase-hooks/database'
import { isAuthenticated } from 'api/autorization'

export default function Index() {
  const t1 = useTranslation('common')
  const t2 = useTranslation('init')

  const [lobbies, loadinglobbies, errorlobbies] = useListVals<any>(
    Rdb.ref('lobby'),
  )

  const [openModal, setOpenModal] = useState<boolean>(false)

  const returnCard = (setting) => {
    switch (setting.type) {
      case 'DUNO':
        return <LobbyCardDuno key={setting.id} t={t2.t} setting={setting} />
    }
  }

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
        <Box width="900px">
          <Box display="flex" marginBottom={['20px', '25px', '30px', '30px']}>
            <ModalInit
              isOpen={openModal}
              onClose={() => setOpenModal(false)}
              t={t2.t}
            />
            <AppButton
              text={t2.t('init:create_room')}
              marginRight={Spaces.component}
              minWidth={['150px', '180px', '200px', '200px']}
              onClick={() => setOpenModal(true)}
            />
            <AppInputSearch placeholder={t2.t('init:search')} />
          </Box>
          {lobbies.map((lobby, index) => {
            return loadinglobbies ? (
              <AppText key={lobby.id}>Loading...</AppText>
            ) : (
              returnCard(lobby)
            )
          })}
        </Box>
      </AppInterface>
    </>
  )
}

export const getServerSideProps = isAuthenticated(async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(getLanguageHeaders(context), [
        'common',
        'init',
      ])),
    },
  }
})
