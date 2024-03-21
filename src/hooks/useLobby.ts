import { useToast } from '@chakra-ui/react'
import { useRouter } from 'next/router'
import { useState } from 'react'
import createLobby from '../pages/api/lobby/create'
import { useAuth } from '../utils'

export function useLobby() {
  const [loading, setLoading] = useState(false)
  const { user } = useAuth()
  const toast = useToast()
  const router = useRouter()

  const createRoom = (setting) => {
    setLoading(true)
    createLobby(setting, user)
      .then((res) => {
        router.push(`/lobby/${setting.type.toLowerCase()}/${res.data}`)
        setLoading(false)
      })
      .catch((error) => {
        setLoading(false)
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 7000,
          isClosable: true,
        })
      })
  }
  const joinRoom = (isPublic, players, nb_playerMax, coin, type, lobby) => {
    if (
      isPublic === true
      //  && user.coin >= coin
    ) {
      if (players.length >= nb_playerMax) {
        toast({
          title: 'Salle complète',
          description: 'La salle à atteint son nombre maximum de joueurs',
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      } else {
        joinRoomApi(lobby, user)
          .then(() => router.push(`/lobby/${type.toLowerCase()}/${lobby.id}`))
          .catch((error) => {
            toast({
              title: 'An error occurred.',
              description: error.message,
              status: 'error',
              duration: 4000,
              isClosable: true,
            })
          })
      }
    }
  }

  const leaveRoom = (lobby) => {
    leaveRoomApi(lobby, user)
      .then(() => router.push(`/`))
      .catch((error) => {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
  }

  const startGame = (lobby) => {
    startGameApi(lobby)
      .then(() => router.push(`/game/${lobby.type.toLowerCase()}/${lobby.id}`))
      .catch((error) => {
        toast({
          title: 'An error occurred.',
          description: error.message,
          status: 'error',
          duration: 4000,
          isClosable: true,
        })
      })
  }

  return { createRoom, joinRoom, leaveRoom, startGame, loading }
}
