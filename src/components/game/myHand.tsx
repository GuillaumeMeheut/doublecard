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
    hand.sort((a, b) => a.value - b.value)

    hand.sort((a, b) => {
      if (b.color === 'special') return -1
      return a.color.localeCompare(b.color)
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
