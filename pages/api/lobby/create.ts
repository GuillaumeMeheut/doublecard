import { NextApiRequest, NextApiResponse } from 'next'
import { Rdb } from 'utils'

export default async function createLobby(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { setting: lobby, user } = req.body
    lobby.players = [
      { userID: user.id, profilImg: user.photo, pseudo: user.pseudo },
    ]
    const autoId = Rdb.ref('lobby').push().key
    lobby.id = autoId
    Rdb.ref('lobby').child(autoId).set(lobby)
    res.redirect(`/lobby/${lobby.id}`)
  } catch (e) {
    res.json('Une erreur est survenue lors de la création du lobby')
  }
}
