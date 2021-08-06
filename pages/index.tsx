import { Box } from '@chakra-ui/react'
import {
  AppButton,
  AppHead,
  AppInputSearch,
  AppInterface,
  LobbyCardDuno,
  ModalInit,
} from 'components'
import useSocket from 'hooks/useSocket'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useState } from 'react'
import { Color, Spaces } from 'theme'
import { DunoSettingLobby } from 'types'
import { getLanguageHeaders } from 'utils'

export default function Index() {
  const t1 = useTranslation('common')
  const t2 = useTranslation('init')

  const [openModal, setOpenModal] = useState<boolean>(false)
  const [games, setGames] = useState<Array<DunoSettingLobby>>([
    {
      _id: '16516516',
      type: 'DUNO',
      img: '/assets/init/duno.svg',
      room_name: 'Salon de Guillaume',
      nb_player: 4,
      round: 2,
      public: false,
      pin: '8462',
      players: [
        { profilImg: 'https://picsum.photos/130/94', pseudo: 'Guillaume' },
        { profilImg: 'https://picsum.photos/94/94', pseudo: 'Colin' },
        { profilImg: 'https://picsum.photos/150/94', pseudo: 'Nathan' },
      ],
    },
    {
      _id: '46451',
      type: 'DUNO',
      img: '/assets/init/duno.svg',
      room_name: 'wsh les bg venez me rejoindre',
      nb_player: 3,
      round: 2,
      public: true,
      pin: null,
      players: [
        { profilImg: 'https://picsum.photos/140/94', pseudo: 'Thomas' },
      ],
    },
  ])
  const socket = useSocket()

  if (socket)
    socket.on('createLobby', (data) => {
      setGames([...games, data])
    })

  const returnCard = (setting) => {
    switch (setting.type) {
      case 'DUNO':
        return <LobbyCardDuno key={setting._id} t={t2.t} setting={setting} />
      default:
        console.log(`Bug frerot`)
    }
  }

  console.log(games)
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
          {games.map((setting) => {
            return returnCard(setting)
          })}
        </Box>
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
    },
  }
}
