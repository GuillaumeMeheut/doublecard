import { Box } from '@chakra-ui/react'
import { AppButton, AppText } from 'components'
import { auth, Rdb } from 'utils'
import { useAuthState } from 'react-firebase-hooks/auth'
import { useList } from 'react-firebase-hooks/database'

export default function Index() {
  const [user, loadingAuth] = useAuthState(auth)
  const [snapshots, loadingUsers] = useList(Rdb.ref('users'))

  console.log('Loading:', loadingAuth, 'Current user:', user)

  const addUser = (): void => {
    const autoId = Rdb.ref('users').push().key
    Rdb.ref('users').child(autoId).set({
      firstName: 'Georges',
      age: '35',
      passion: 'formul1',
    })
  }
  const addLobby = (): void => {
    const autoId = Rdb.ref('lobby').push().key
    Rdb.ref('lobby')
      .child(autoId)
      .set({
        id: '46451',
        type: 'DUNO',
        img: '/assets/init/duno.svg',
        room_name: 'wsh les bg venez me rejoindre',
        nb_player: 3,
        round: 2,
        public: true,
        pin: null,
        players: [
          { profilImg: 'https://picsum.photos/140/94', pseudo: 'Thomas' },
        ],
      })
  }

  return (
    <Box backgroundColor="black">
      <AppButton text={'Add user'} onClick={() => addUser()} />
      <AppButton text={'Add Lobby'} onClick={() => addLobby()} />
      <AppButton text={'Logged Button'} onClick={() => addUser()} />
      <AppButton text={'Nooo Logged Button'} onClick={() => addUser()} />

      {loadingUsers
        ? null
        : snapshots.map((snapshot) => {
            return (
              <>
                <AppText>Name:{snapshot.val().firstName}</AppText>
                <AppText>Age:{snapshot.val().age}</AppText>
                <AppText>Passion:{snapshot.val().passion}</AppText>
              </>
            )
          })}
    </Box>
  )
}
