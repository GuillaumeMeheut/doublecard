import firebase from 'firebase/app'
import { NextApiRequest, NextApiResponse } from 'next'
import { Rdb, firestore } from '../../../../utils'

export default async function endDunoGame(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { winner, lobby, gameID } = req.body

    const coinWinning = lobby.coin * lobby.nb_player

    console.log('winner: ' + winner)
    console.log('nb de coin  gagné: ' + coinWinning)

    //fermer le lobby et la partie
    Rdb.ref(`lobby/${lobby.id}`).remove()
    Rdb.ref(`game/${gameID}`).remove()

    await firestore
      .collection('users')
      .doc(winner)
      .update({
        coin: firebase.firestore.FieldValue.increment(coinWinning),
      })

    return res.json('Game ended')
  } catch (e) {
    res.json('Error while ending game')
  }
}
