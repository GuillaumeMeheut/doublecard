import { useState } from 'react'
import { CardDuno } from '../types'
import { useAuth, Rdb } from '../utils'

export function useHand(drawCard, gameID) {
  const [hand, setHand] = useState<Array<CardDuno>>([])

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
    const card = hand.splice(index, 1)[0]
    setHand(hand)
    updateData(hand)
    return card
  }

  return { hand, setHand, draw, playCard }
}
