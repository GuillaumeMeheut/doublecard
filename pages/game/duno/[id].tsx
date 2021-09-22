import {
  AppHead,
  AppInterface,
  Deck,
  MyHand,
  OpponentHand,
  CardStacks,
  ColorSelector,
} from 'components'
import { useDuno } from 'hooks'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
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
    if (game) {
      setGame(game)
      setStack(game.stack)
    }
  }, [game])

  const {
    setGame,
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
      <AppInterface t={t1.t} inGame={true}>
        {game && lobby ? (
          <>
            {colorVisible ? <ColorSelector selectColor={selectColor} /> : <></>}
            <Deck deck={deck} drawDuno={drawDuno} />
            <CardStacks stack={game.stack[game.stack.length - 1]} />
            <MyHand hand={hand} playCardDuno={playCardDuno} user={user} />
            {Object.values(game.players)
              .filter((player: any) => player.id !== user.id)
              .map((player: any) => (
                <OpponentHand
                  key={player.id}
                  nbCard={player.nbCard}
                  skin={'basic'}
                />
              ))}
            )
          </>
        ) : (
          'Loading...'
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
        'game',
        'duno',
      ])),
      gameID: context.query.id,
    },
  }
}
