import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { CardSize } from '../../theme'
import { CardDunoStacks } from '../../types'
import { AppImage } from '../general'

type Props = {
  // stack: Array<CardDunoStacks>
  stack: CardDunoStacks
}

export const CardStacks: FunctionComponent<Props> = ({ stack }) => {
  return (
    <Box>
      {/* {stack.splice(stack.length - 1, 1).map((card, index) => {
        return (
          <AppImage
            key={index}
            src={`/assets/cardSkin/duno/${card.skin}/${card.color}/${card.value}.svg`}
            alt={`${card.color} ${card.value}`}
            height={CardSize.height}
          />
        )
      })} */}

      <AppImage
        src={`/assets/cardSkin/duno/${stack.skin}/${stack.color}/${stack.value}.svg`}
        alt={`${stack.color} ${stack.value}`}
        height={CardSize.height}
      />
    </Box>
  )
}
