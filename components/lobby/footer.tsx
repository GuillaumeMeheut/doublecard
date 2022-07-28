import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { AppButton } from 'components'
import { Spaces } from 'theme'

type Props = {
  btn1: string
  btn2: string
  onLeave: (lobby: any) => void
  onStart: (lobby: any) => void
}

export const FooterLobby: FunctionComponent<Props> = ({
  btn1,
  btn2,
  onLeave,
  onStart,
}) => {
  return (
    <Box display="flex">
      <AppButton onClick={onLeave} text={btn1} marginRight={Spaces.component} />
      <AppButton onClick={onStart} text={btn2} />
    </Box>
  )
}
