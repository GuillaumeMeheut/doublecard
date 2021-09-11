import { Box, useToast } from '@chakra-ui/react'
import { AppHead, AppInterface, AppText, FooterLobby } from 'components'
import { useLobby } from 'hooks'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { Color } from 'theme'
import { DunoSettingLobby } from 'types'
import { getLanguageHeaders, Rdb } from 'utils'

export default function Index({ lobbyID }) {
  const t1 = useTranslation('common')
  const t2 = useTranslation('lobby')

  const toast = useToast()
  const router = useRouter()

  const { leaveRoom, startGame } = useLobby()

  const [lobby, loadinglobby, errorlobby] = useObjectVal<DunoSettingLobby>(
    Rdb.ref(`lobby/${lobbyID}`),
  )

  useEffect(() => {
    if (lobby?.status === 'inGame')
      router.push(`/game/${lobby.type.toLowerCase()}/${lobby.id}`)
  }, [lobby])

  useEffect(() => {
    //verifier si deja present sinon verifier si public ou non
    //puis l'ajouter au user actuel
  }, [])

  const onStart = () => {
    if (lobby.players.length === lobby.nb_player) startGame(lobby)
    else {
      toast({
        title: 'Pas assez de joueurs',
        description: `${lobby.nb_player} joueur(s) requis pour commencer la partie`,
        status: 'error',
        duration: 4000,
        isClosable: true,
      })
    }
  }

  return (
    <>
      <AppHead
        icon="/assets/common/logo.svg"
        url={`${process.env.NEXT_PUBLIC_BASE_URL}`}
        name={t2.t('lobby:page_title', {
          lobbyName: loadinglobby ? '...' : lobby.room_name,
        })}
        description={t2.t('lobby:page_description')}
        themeColor={Color.blueMain}
        author={t1.t('common:head_initor')}
        keywords={t2.t('lobby:page_keywords')}
        language={t1.t('common:language')}
      />
      <AppInterface t={t1.t}>
        <Box backgroundColor={Color.blueMain} width="80%">
          {loadinglobby ? (
            <AppText>Loading...</AppText>
          ) : (
            <Box width={['90%', '90%', '90%', '90%']}>
              <AppText>{lobby.room_name}</AppText>
            </Box>
          )}
          <FooterLobby
            text1={t2.t('lobby:leave')}
            text2={t2.t('lobby:start')}
            onLeave={() => leaveRoom(lobby)}
            onStart={() => onStart()}
          />
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
        'lobby',
      ])),
      lobbyID: context.query.id,
    },
  }
}
