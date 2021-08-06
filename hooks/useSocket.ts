import { useEffect, useState } from 'react'
import io from 'socket.io-client'

const socket = io(process.env.NEXT_PUBLIC_API_URL)

export default function useSocket() {
  const [activeSocket, setActiveSocket] = useState(null)

  useEffect(() => {
    if (activeSocket || !socket) return
    setActiveSocket(socket)
  }, [socket])

  return activeSocket
}
