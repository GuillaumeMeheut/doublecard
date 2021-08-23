import React, { FunctionComponent, useEffect, useState } from 'react'
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

  useEffect(() => {
    console.log('proc')
  })

  return (
    <Box
      minHeight={'100vh'}
      backgroundColor={Color.blackMain}
      display="flex"
      flexDirection="column"
      justifyContent="flex-start"
      alignItems="center"
    >
      <NavBar t={t} />
      {children}
      <Friends />
    </Box>
  )
}
