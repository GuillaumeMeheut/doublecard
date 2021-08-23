import { NextApiRequest, NextApiResponse } from 'next'
import { firestore, Rdb } from 'utils'

export default async function createLobby(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { setting: lobby, user } = req.body

    const userCoin = await firestore.collection('users').doc(user.id).get()

    if (lobby.coin < userCoin.data().coin) {
      lobby.players = [
        { userID: user.id, profilImg: user.picture, pseudo: user.pseudo },
      ]
      const autoId = Rdb.ref('lobby').push().key
      lobby.id = autoId
      Rdb.ref('lobby')
        .child(autoId)
        .set(lobby)
        .then(() => {
          // res.redirect(`/lobby/${lobby.type.toLowerCase()}/${lobby.id}`)
          res.json(lobby.id)
        })
    } else {
      res.status(412).json({ message: 'Insufficient coin' })
    }
  } catch (e) {
    res.json('Une erreur est survenue lors de la création du lobby')
  }
}
