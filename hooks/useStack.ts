import { useState } from 'react'
import { CardDunoStacks } from 'types'
import { Rdb } from 'utils'

export function useStack(gameID) {
  const [stack, setStack] = useState<Array<CardDunoStacks>>([])

  const updateData = () => {
    Rdb.ref(`game/${gameID}/stack`).set(stack)
  }

  const addCardOnStack = (card, skin) => {
    card.skin = skin
    stack.push(card)

    Rdb.ref(`game/${gameID}/stack`).set(stack)
  }

  return { setStack, addCardOnStack }
}
