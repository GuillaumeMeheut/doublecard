import { NextApiRequest, NextApiResponse } from 'next'
import { firestore } from 'utils'
// const admin = require('firebase-admin')

export default async function endDunoGame(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    const { winner, lobby } = req.body

    const coinWinning = lobby.coin * lobby.nb_player

    // firestore
    //   .collection('users')
    //   .doc(winner)
    //   .update({
    //     coin: admin.firestore.FieldValue.increment(coinWinning),
    //   })
  } catch (e) {
    res.json('Error')
  }
}
