import { Box } from '@chakra-ui/react'
import { isAuthenticated } from 'api/autorization'
import {
  AppHead,
  Layout,
  Deck,
  MyHand,
  OpponentHand,
  CardStacks,
  ColorSelector,
  AvatarGame,
  TextZoomEffect,
} from 'components'
import { useDuno } from 'hooks'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import React, { useEffect } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { Color } from 'theme'
import { getLanguageHeaders, Rdb, useAuth } from 'utils'

export default function Index({ gameID }) {
  const t1 = useTranslation('common')
  const t2 = useTranslation('game')
  const t3 = useTranslation('duno')

  const { user } = useAuth()
  user.skin = 'basic'
  //Définir le skin de l'user dans l'auth comme les coins

  const [game, loadingGame, errorGame] = useObjectVal(Rdb.ref(`game/${gameID}`))
  const [lobby, loadingLobby, errorLobby] = useObjectVal(
    Rdb.ref(`lobby/${gameID}`),
  )

  useEffect(() => {
    if (game) {
      setGame(game)
      setHand(game.players[user.id].hand)
      setDeck(game.deck)
      setStack(game.stack)
    }
  }, [loadingGame])

  useEffect(() => {
    if (lobby) {
      setLobby(lobby)
    }
  }, [loadingLobby])

  useEffect(() => {
    if (game) {
      setGame(game)
      setStack(game.stack)
    }
  }, [game])

  const {
    setGame,
    setLobby,
    setDeck,
    setHand,
    setStack,
    deck,
    hand,
    colorVisible,
    playCardDuno,
    drawDuno,
    selectColor,
  } = useDuno(gameID, user)

  const returnAreaPlayer = (index: number): string => {
    switch (index) {
      case 0:
        return 'player1'
      case 1:
        return 'player2'
      case 2:
        return 'player3'
      default:
        break
    }
  }

  return (
    <>
      <AppHead
        icon="/assets/common/logo.svg"
        url={`${process.env.NEXT_PUBLIC_BASE_URL}`}
        name={t2.t('duno:page_title', {
          gameName: loadingGame ? '...' : game.room_name,
          gameType: 'DUNO',
        })}
        description={t2.t('duno:page_description')}
        themeColor={Color.blueMain}
        author={t1.t('common:head_initor')}
        keywords={t2.t('duno:page_keywords')}
        language={t1.t('common:language')}
      />
      <Layout inGame={true}>
        {game && lobby ? (
          <>
            {colorVisible ? <ColorSelector selectColor={selectColor} /> : <></>}
            {game.turn === user.id ? (
              <TextZoomEffect
                text={'Your Turn'}
                textColor={'white'}
                bgColor={Color.blackSecond}
              />
            ) : (
              <></>
            )}

            <Box
              display="grid"
              gridTemplateAreas={`". player1 ."
              "player2 cardStack player3"
              ". player4 ."`}
            >
              {Object.values(game.players)
                .filter((player: any) => player.id !== user.id)
                .map((player: any, index: number) => (
                  <Box
                    key={player.id}
                    gridArea={returnAreaPlayer(index)}
                    display="flex"
                    flexDirection={index === 0 ? 'column-reverse' : 'column'}
                    justifyContent="center"
                    alignItems="center"
                    transform={
                      index === 1
                        ? 'rotate(90deg)'
                        : index === 2
                        ? 'rotate(-90deg)'
                        : ''
                    }
                  >
                    <OpponentHand nbCard={player.nbCard} skin={'basic'} />
                    <AvatarGame
                      pseudo={player.pseudo}
                      img={player.img ? player.img : null}
                      turn={player.id === game.turn ? true : false}
                    />
                  </Box>
                ))}
              <Box
                gridArea="cardStack"
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <Deck deck={deck} drawDuno={drawDuno} />
                <CardStacks stack={game.stack[game.stack.length - 1]} />
              </Box>
              <Box gridArea="player4">
                <MyHand hand={hand} playCardDuno={playCardDuno} user={user} />
                <AvatarGame
                  pseudo={user.pseudo}
                  img={user.img}
                  turn={user.id === game.turn ? true : false}
                />
                )
              </Box>
            </Box>
          </>
        ) : (
          'Loading...'
        )}
      </Layout>
    </>
  )
}

export const getServerSideProps = async (context) => {
  return {
    props: {
      ...(await serverSideTranslations(getLanguageHeaders(context), [
        'common',
        'game',
        'duno',
      ])),
      gameID: context.query.id,
    },
  }
}
