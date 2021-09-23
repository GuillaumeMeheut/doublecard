import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { AppImage, MotionBox } from 'components'
import { CardDuno, User } from 'types'
import { CardSize, ColorHover } from 'theme'

type Props = {
  hand: any
  user: User
  playCardDuno: (index: number) => void
}

export const MyHand: FunctionComponent<Props> = ({
  hand,
  user,
  playCardDuno,
}) => {
  hand.sort((a, b) => {
    if (a.value > b.value) return 1
    if (a.value < b.value) return -1
  })

  hand.sort((a, b) => {
    if (b.color === 'special') return -1
    if (a.color > b.color) return 1
    if (a.color < b.color) return -1
    return 0
  })

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {hand.map((card, index) => {
        return (
          <AppImage
            key={index}
            src={`/assets/cardSkin/duno/${user.skin}/${card.color}/${card.value}.svg`}
            alt={`${card.color} ${card.value}`}
            height={CardSize.height}
            cursor="pointer"
            transition="transform .2s"
            _hover={{
              transform: 'translateY(-15px)',
            }}
            onClick={() => {
              playCardDuno(index)
            }}
          />
        )
      })}
    </Box>
  )
}
