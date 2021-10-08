import {
  NextApiHandler,
  NextApiRequest,
  NextApiResponse,
  NextPageContext,
} from 'next'
import { adminAuth } from 'utils/firebase/adminFirebase'
import nookies from 'nookies'

export const isAuthenticated = (fn) => async (context: NextPageContext) => {
  try {
    const cookies = nookies.get(context)
    if (cookies.token) {
      const { uid } = await adminAuth.verifyIdToken(cookies.token)
      if (uid) {
        return await fn(context)
      }
    } else {
      context.res?.writeHead(302, { location: '/auth' })
      context.res?.end()
    }
  } catch (error) {
    console.log(error)
    // context.res.writeHead(302, { location: '/auth' })
    // context.res.end()
  }
}
