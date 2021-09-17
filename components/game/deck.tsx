import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { CardDuno } from 'types'
import { AppButton } from 'components'

type Props = {
  deck: Array<CardDuno>
  draw: (nb: number) => void
}

export const Deck: FunctionComponent<Props> = ({ deck, draw }) => {
  return <Box>{<AppButton text={'draw'} onClick={() => draw(1)} />}</Box>
}
