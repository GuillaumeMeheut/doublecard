import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { AppImage } from 'components'

import { User } from 'types'

type Props = {
  hand: any
  user: User
}

export const MyHand: FunctionComponent<Props> = ({ hand, user }) => {
  return (
    <Box>
      {hand.map((card) => {
        return (
          <>
            <AppImage
              src={`/assets/cardSkin/duno/${user.skin}/${card.color}/${card.value}`}
              heigth={['100px', '100px', '100px', '100px']}
              alt={`${card.color} ${card.value}`}
            />
          </>
        )
      })}
    </Box>
  )
}
