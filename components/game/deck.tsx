import React, { FunctionComponent, useEffect } from 'react'
import { Box } from '@chakra-ui/react'
import { AppButton, AppImage, AppInputNumber, AppText } from 'components'
import { Color, FontSize, Spaces } from 'theme'
import { useDeck, useHand } from 'hooks'
import { getDunoDeck } from 'utils'

type Props = {
  gameID: string
}

export const Deck: FunctionComponent<Props> = ({ gameID }) => {
  // const { deck, shuffle } = useDeck(getDunoDeck(), gameID)
  // const { hand, draw } = useHand(deck, gameID)

  // useEffect(() => {
  //   shuffle()
  // }, [])

  return <Box>{/* <AppButton text={'draw'} onClick={() => draw(1)} /> */}</Box>
}
