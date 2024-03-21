import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { AppImage } from '../general'
import { CardSize } from '../../theme'

type Props = {
  nbCard: any
  skin: string
}

export const OpponentHand: FunctionComponent<Props> = ({ nbCard, skin }) => {
  return (
    <Box display="flex" justifyContent="center" alignItems="center">
      {[...Array(nbCard)].map((e, i) => (
        <AppImage
          key={i}
          src={`/assets/cardSkin/duno/${skin}/card_back.svg`}
          alt={`opponent card`}
          heigth={CardSize.height}
        />
      ))}
    </Box>
  )
}
