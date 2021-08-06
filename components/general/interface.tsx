import React, { FunctionComponent, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { Color } from '../../theme'
import { Friends, NavBar } from 'components'
import { TFunction } from 'next-i18next'

type Props = {
  t: TFunction
}

export const AppInterface: FunctionComponent<Props> = ({ children, t }) => {
  const user = {
    username: 'guillaume',
    profilPic: 'https://picsum.photos/1200/300',
    coin: 784,
  }

  useEffect(() => {
    //a faire des trucs socket ici
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
      <NavBar t={t} user={user} />
      {children}
      <Friends />
    </Box>
  )
}
