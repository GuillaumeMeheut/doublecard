import {
  AppHead,
  AppInterface,
  Deck,
  MyHand,
  OpponentHand,
  CardStacks,
} from 'components'
import { useDeck, useDuno, useHand } from 'hooks'
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
    }
    console.log('useffect')
  }, [loadingGame])

  const { setGame, randomizeTurn } = useDuno({}, gameID)
  const { deck, setDeck, drawCard } = useDeck([], gameID)
  const { hand, setHand, draw, playCard } = useHand([], drawCard, gameID)

  if (game && lobby) {
    randomizeTurn()
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
      <AppInterface t={t1.t} inGame={true}>
        {game && lobby ? (
          <>
            <Deck deck={deck} draw={draw} />
            <CardStacks />
            <MyHand hand={hand} playCard={playCard} user={user} />
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
