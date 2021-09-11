import { AppHead, AppInterface, Deck, MyHand } from 'components'
import { useDeck, useHand } from 'hooks'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useEffect } from 'react'
import { useObjectVal } from 'react-firebase-hooks/database'
import { Color } from 'theme'
import { getDunoDeck, getLanguageHeaders, Rdb, useAuth } from 'utils'

export default function Index({ gameID }) {
  const t1 = useTranslation('common')
  const t2 = useTranslation('game')
  const t3 = useTranslation('duno')

  const { user } = useAuth()
  user.skin = 'basic'
  //Définir le skin de l'user dans l'auth comme les coins

  const { deck, shuffle } = useDeck(getDunoDeck(), gameID)
  const { hand, draw } = useHand(deck, gameID)

  useEffect(() => {
    shuffle()
    draw(8)
  }, [])

  const [game, loadingGame, errorGame] = useObjectVal(Rdb.ref(`game/${gameID}`))

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
        {game ? (
          <>
            <Deck gameID={gameID} />
            {/* game.game.players ? (
            <MyHand hand={game.game.players[user.id].hand} user={user} />) :
            <> </> */}
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
