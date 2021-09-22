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
        stack: [],
      }

      //premiere carte sur le stack
      let firstCard
      do {
        firstCard = game.deck.splice(
          Math.floor(Math.random() * game.deck.length),
          1,
        )[0]
      } while (
        firstCard.color === 'special' ||
        firstCard.value === '+2' ||
        firstCard.value === 'cross' ||
        firstCard.value === 'arrow'
      )
      firstCard.skin = 'basic'
      game.stack.push(firstCard)
      Rdb.ref(`game/${lobby.id}/stack`).set(game.stack)

      //distribution des cartes
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
      //Randomize turn
      const id =
        game.players[Math.floor(Math.random() * game.players.length)].id
      Rdb.ref(`game/${lobby.id}/turn`).set(id)

      //set sens
      Rdb.ref(`game/${lobby.id}/invertSens`).set(false)

      //set plus
      Rdb.ref(`game/${lobby.id}/plus`).set(1)

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
