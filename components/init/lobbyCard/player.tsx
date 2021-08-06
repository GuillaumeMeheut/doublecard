import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { AppImage, AppText } from 'components'
import { Color, Spaces } from 'theme'

type Props = {
  actual: number
  max: number
  players: Array<any>
}

export const NbPlayer: FunctionComponent<Props> = ({
  actual,
  max,
  players,
}) => {
  return (
    <Box display="flex">
      {players
        ? players.map((player, index) => {
            return (
              <AppImage
                key={index}
                src={player.profilImg}
                alt={player.pseudo}
                width={['15px', '15px', '20px', '20px']}
                height={['15px', '15px', '20px', '20px']}
                rounded="full"
                border={`1px solid ${Color.blueMain}`}
                transform={index === 0 ? null : `translateX(-${7 * index}px)`}
              />
            )
          })
        : null}
      <Box
        display="flex"
        marginLeft={Spaces.component}
        transform={`translateX(-${7 * actual}px)`}
      >
        <AppText
          fontSize={['10px', '10px', '12px', '12px']}
          color={Color.whiteSecond}
        >
          {players.slice(0, 3).map((player, index) => {
            return `${player.pseudo}${
              index === 0 && index === players.length
                ? ''
                : index === players.length - 1
                ? '...'
                : ', '
            }`
          })}
        </AppText>
        <AppText
          fontSize={['10px', '10px', '12px', '12px']}
          color={Color.whiteSecond}
          marginLeft={Spaces.componentSmall}
        >
          {actual + '/' + max}
        </AppText>
      </Box>
    </Box>
  )
}
