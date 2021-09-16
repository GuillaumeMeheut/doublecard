import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { AppImage } from 'components'
import { User } from 'types'
import { CardSize, ColorHover } from 'theme'

type Props = {
  hand: any
  user: User
}

export const MyHand: FunctionComponent<Props> = ({ hand, user }) => {
  const playCard = (card) => {
    console.log('card played')
    console.log(card)
  }

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
      {hand.map((card) => {
        return (
          <AppImage
            key={`${card.color} ${card.value}`}
            src={`/assets/cardSkin/duno/${user.skin}/${card.color}/${card.value}.svg`}
            alt={`${card.color} ${card.value}`}
            heigth={CardSize.height}
            transition="transform .2s"
            _hover={{
              transform: 'translateY(-15px)',
            }}
            onClick={() => playCard(card)}
          />
        )
      })}
    </Box>
  )
}
