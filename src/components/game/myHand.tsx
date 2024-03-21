import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { CardSize } from '../../theme'
import { User } from '../../types'
import { AppImage } from '../general'

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
  if (hand) {
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
  }

  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {hand
        ? hand.map((card, index) => {
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
          })
        : null}
    </Box>
  )
}
