import { useState } from 'react'
import { Rdb, shuffleDeck } from 'utils'

export function useDeck(baseDeck, gameID) {
  const [deck, setDeck] = useState(baseDeck)

  const shuffle = () => {
    setDeck(shuffleDeck(deck))
    Rdb.ref(`game/${gameID}/game`).child('deck').set(deck)
  }

  const drawCard = (nb: number) => {
    for (let i = 0; i < nb; i++) {
      const card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0]
      setDeck(deck)
      return card
    }
    Rdb.ref(`game/${gameID}/game/deck`).set(deck)
  }

  return { deck, shuffle, drawCard }
}
