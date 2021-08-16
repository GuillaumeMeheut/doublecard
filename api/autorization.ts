import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
// import { adminAuth } from 'utils/firebase/adminFirebase'

export const isAuthenticated =
  (fn: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse) => {
    try {
      // const { uid } = await adminAuth.verifyIdToken(req.headers.token)
      // if (uid) {
      //   return await fn(req, res)
      // }
      // //   if (res.status === 401) {
      //     Router.replace('/auth')
      //     return {}
      //   }
    } catch (error) {
      res.status(500).json({ error })
    }
  }
