import { NextApiRequest, NextApiResponse } from 'next'
import { getDunoDeck, Rdb, shuffleDeck } from 'utils'

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
        players: [
          {
            id: 'gbfjkdbk',
            pseudo: 'LgkTak',
            hand: [],
          },
        ],
        deck: shuffleDeck(getDunoDeck()),
      }

      Rdb.ref('game')
        .child(lobby.id)
        .set({ lobby, game })
        .then(() => {
          res.json('Starting game...')
        })
    } else {
      res.status(413).json('error')
    }
  } catch (e) {
    res.json('Error')
  }
}
