import { useState } from 'react'
import { Rdb, useAuth } from 'utils'
import { useDeck } from './useDeck'

export function useHand(deck, gameID) {
  const [hand, setHand] = useState([])

  const { user } = useAuth()

  const { drawCard } = useDeck(deck, gameID)

  const draw = (nb: number) => {
    for (let i = 0; i < nb; i++) {
      const card = drawCard(nb)
      hand.push(card)
    }
    setHand(hand)
    Rdb.ref(`game/${gameID}/game/players/${user.id}/hand`).set(hand)
  }

  return { hand, draw }
}
