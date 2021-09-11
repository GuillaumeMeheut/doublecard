import React, { FunctionComponent, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Color } from '../../theme'
import { Friends, NavBar } from 'components'
import { TFunction } from 'next-i18next'
import { useAuth } from 'utils'

type Props = {
  t: TFunction
  inGame?: boolean
}

export const AppInterface: FunctionComponent<Props> = ({
  children,
  t,
  inGame,
}) => {
  const { user } = useAuth()

  useEffect(() => {
    // console.log('proc')
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
      {inGame ? null : <NavBar t={t} />}
      {children}
      <Friends />
    </Box>
  )
}
