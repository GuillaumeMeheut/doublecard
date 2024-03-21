import React, { FunctionComponent } from 'react'
import { Box } from '@chakra-ui/react'
import { CardDuno } from '../../types'
import { AppButton } from '../general'

type Props = {
  deck: Array<CardDuno>
  drawDuno: () => void
}

export const Deck: FunctionComponent<Props> = ({ deck, drawDuno }) => {
  return <Box>{<AppButton text={'draw'} onClick={() => drawDuno()} />}</Box>
}
