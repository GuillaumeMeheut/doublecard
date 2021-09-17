import { useState } from 'react'
import { CardDuno } from 'types'
import { Rdb, useAuth } from 'utils'

export function useHand(baseHand, drawCard, gameID) {
  const [hand, setHand] = useState<Array<CardDuno>>(baseHand)

  const { user } = useAuth()

  const updateData = (hand) => {
    const updates = {}
    updates[`game/${gameID}/players/${user.id}/hand`] = hand
    updates[`game/${gameID}/players/${user.id}/nbCard`] = hand.length
    Rdb.ref().update(updates)
  }

  const draw = (nb: number) => {
    const cards = drawCard(nb)
    const newHand = hand.concat(cards)
    setHand(newHand)
    updateData(newHand)
  }

  const playCard = (index) => {
    hand.splice(index, 1)
    setHand(hand)
    updateData(hand)
  }

  return { hand, setHand, draw, playCard }
}
