import React, { FunctionComponent, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { Color } from '../../theme'
import { Friends, NavBar } from 'components'
import { TFunction } from 'next-i18next'
import { firestore, useAuth } from 'utils'
import { useDocumentDataOnce } from 'react-firebase-hooks/firestore'
import { User } from 'types'

type Props = {
  t: TFunction
}

export const AppInterface: FunctionComponent<Props> = ({ children, t }) => {
  const { user } = useAuth()

  const [userData, loading] = useDocumentDataOnce<User>(
    firestore.doc(`/users/${user.id}`),
    // firestore.doc(`/users/hzS8K0hou6hpSPhuy4dNCSDCBJ63`),
  )

  useEffect(() => {
    //a faire des trucs rtdb ici
  }, [])

  return (
    <Box
      minHeight={'100vh'}
      backgroundColor={Color.blackMain}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <NavBar t={t} user={userData} loading={loading} />
      {children}
      <Friends />
    </Box>
  )
}
