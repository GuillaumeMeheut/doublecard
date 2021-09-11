import { NextApiRequest, NextApiResponse } from 'next'
import { Rdb } from 'utils'

export default async function joinLobby(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { lobby } = req.body

    if (lobby.players.length === lobby.nb_player) {
      lobby.status = 'inGame'
      Rdb.ref(`lobby/${lobby.id}`).update(lobby)

      Rdb.ref('game')
        .child(lobby.id)
        .set({ lobby })
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
