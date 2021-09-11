import React, { FunctionComponent } from 'react'
import { Box, BoxProps } from '@chakra-ui/react'
import { AppButton, AppImage, AppInputNumber, AppText } from 'components'
import { Color, FontSize, Spaces } from 'theme'

type Props = {
  text1: string
  text2: string
  onLeave: (lobby: any) => void
  onStart: (lobby: any) => void
}

export const FooterLobby: FunctionComponent<Props> = ({
  text1,
  text2,
  onLeave,
  onStart,
}) => {
  return (
    <Box display="flex">
      <AppButton
        onClick={onLeave}
        text={text1}
        marginRight={Spaces.component}
      />
      <AppButton onClick={onStart} text={text2} />
    </Box>
  )
}