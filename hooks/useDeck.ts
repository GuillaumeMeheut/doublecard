import { useState } from 'react'
import { CardDuno } from 'types'
import { Rdb, shuffleDeck } from 'utils'

export function useDeck(gameID) {
  const [deck, setDeck] = useState<Array<CardDuno>>([])

  const updateData = () => {
    Rdb.ref(`game/${gameID}/deck`).set(deck)
  }

  const shuffle = () => {
    setDeck(shuffleDeck(deck))
    updateData()
  }

  const drawCard = (nb: number) => {
    let cards = []
    for (let i = 0; i < nb; i++) {
      cards.push(deck.splice(Math.floor(Math.random() * deck.length), 1)[0])
      setDeck(deck)
    }
    updateData()
    return cards
  }

  return { deck, setDeck, shuffle, drawCard }
}
