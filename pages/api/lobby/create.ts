import { NextApiRequest, NextApiResponse } from 'next'
import { firestore, Rdb } from 'utils'

export default async function createLobby(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { setting: lobby, user } = req.body

    const userFirestore = await firestore.collection('users').doc(user.id).get()

    if (lobby.coin <= userFirestore.data().coin) {
      lobby.players = [{ id: user.id, img: user.img, pseudo: user.pseudo }]
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
