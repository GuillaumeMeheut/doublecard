import { NextApiRequest, NextApiResponse } from 'next'
import { Rdb, test } from 'utils'

export default async function joinLobby(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { lobby, user } = req.body

    lobby.players.push({ pseudo: user.pseudo, userID: user.id })

    Rdb.ref(`lobby/${lobby.id}`).update(lobby)

    res.json('Lobby successfully create')
  } catch (e) {
    res.json('Une erreur est survenue lors de la récupération des données')
  }
}
