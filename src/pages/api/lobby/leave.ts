import { NextApiRequest, NextApiResponse } from 'next'
import { Rdb } from '../../../utils'

export default async function leaveLobby(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { lobby, user } = req.body

    if (lobby.players.length === 1) {
      Rdb.ref(`lobby/${lobby.id}`).remove()
    } else {
      const index = lobby.players.find((player) => player.id === user.id)

      lobby.players.splice(index, 1)

      Rdb.ref(`lobby/${lobby.id}`).update(lobby)
    }
  } catch (e) {
    res.json('Une erreur est survenue lors de la récupération des données')
  }
}
