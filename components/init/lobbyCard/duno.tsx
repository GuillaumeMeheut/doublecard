import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { TFunction } from 'next-i18next'
import { ButtonSize, Color, ComponentSize, ImageSize, Spaces } from 'theme'
import { DunoSettingLobby } from 'types'
import { AppButton, AppImage, NbPlayer } from 'components'

type Props = {
  t: TFunction
  setting: DunoSettingLobby
}

export const LobbyCardDuno: FunctionComponent<Props> = ({ t, setting }) => {
  return (
    <Box
      width="100%"
      marginBottom={Spaces.component}
      backgroundColor={Color.blueMain}
      padding={Spaces.componentBig}
      borderRadius={ComponentSize.borderRadius}
    >
      <AppImage
        src={setting.img}
        alt={setting.type}
        width={ImageSize.gameIcon}
        height={ImageSize.gameIcon}
        image={{ objectFit: 'fill' }}
      />
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <NbPlayer
          actual={setting.players.length}
          max={setting.nb_player}
          players={setting.players}
        />
        <AppButton
          text={t('init:join')}
          width={ButtonSize.mediumWidth}
          height={ButtonSize.mediumHeight}
          marginTop="-25px"
        />
      </Box>
    </Box>
  )
}
