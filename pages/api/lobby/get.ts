import { NextApiRequest, NextApiResponse } from 'next'
import { Rdb } from 'utils'

export default async function getLobby(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  try {
    Rdb.ref('lobby').once(req.body.id, (data) => {
      res.json(data)
    })
  } catch (e) {
    res.json('Une erreur est survenue lors de la récupération des données')
  }
}
