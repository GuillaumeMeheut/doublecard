import { useToast } from '@chakra-ui/react'
import { joinRoomApi } from 'api'
import router from 'next/router'
import { useAuth } from 'utils'

export function useLobby() {
  const { user } = useAuth()
  const toast = useToast()

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

  return { joinRoom }
}
