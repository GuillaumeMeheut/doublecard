import React, { FunctionComponent, ReactNode, useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'
import { Color } from '../../theme'
import { useAuth } from '../../utils'
import { NavBar, Friends } from '../general'

type Props = {
  children: ReactNode
  inGame?: boolean
}

export const Layout: FunctionComponent<Props> = ({ children, inGame }) => {
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
      {inGame ? null : user.id && <NavBar user={user} />}
      {children}
      <Friends />
    </Box>
  )
}
