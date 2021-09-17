import { NextApiRequest, NextApiResponse } from 'next'
import { dealCards, getDunoDeck, Rdb, shuffleDeck } from 'utils'

export default async function joinDunoLobby(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { lobby } = req.body

    if (lobby.players.length === lobby.nb_player) {
      lobby.status = 'inGame'
      Rdb.ref(`lobby/${lobby.id}`).set(lobby)

      const game = {
        players: lobby.players,
        deck: shuffleDeck(getDunoDeck()),
      }

      game.players.forEach((player, index) => {
        const nbCard = 7
        const { deck, hand } = dealCards(game.deck, nbCard)
        game.deck = deck
        game.players[index].hand = hand
        game.players[index].nbCard = nbCard
        Rdb.ref(`game/${lobby.id}/players/${player.id}`).set(
          game.players[index],
        )
      })

      Rdb.ref(`game/${lobby.id}/deck`)
        .set(game.deck)
        .then(() => {
          res.redirect(`/game/duno/${lobby.id}`)
        })
    } else {
      res.json({ message: 'Unable to start the game' })
    }
  } catch (e) {
    res.json('Error')
  }
}
