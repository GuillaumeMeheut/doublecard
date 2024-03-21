import { Flex, useToast, Spinner, Center } from '@chakra-ui/react'

import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import {
  AppHead,
  Layout,
  AppText,
  LinkInviteLobby,
  FooterLobby,
} from '../../../components'
import { useLobby } from '../../../hooks'
import { Color, ComponentSize } from '../../../theme'
import { DunoSettingLobby } from '../../../types'
import { Rdb, getLanguageHeaders } from '../../../utils'

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
      <Layout>
        <Flex
          backgroundColor={Color.blueMain}
          direction={'column'}
          justify="center"
          align="center"
          width="80%"
          minHeight={'80vh'}
          borderRadius={ComponentSize.borderRadius}
        >
          {loadinglobby ? (
            <Center>
              <Spinner color={Color.red} size="xl" />
            </Center>
          ) : (
            <>
              <Flex>
                <AppText>{lobby.room_name}</AppText>
              </Flex>
              <Flex>
                <LinkInviteLobby
                  link={'http://localhost:3000/lobby/duno/-N835S8GNaXkQwF73nO5'}
                />
                <FooterLobby
                  btn1={t2.t('lobby:leave')}
                  btn2={t2.t('lobby:start')}
                  onLeave={() => leaveRoom(lobby)}
                  onStart={() => onStart()}
                />
              </Flex>
            </>
          )}
        </Flex>
      </Layout>
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
