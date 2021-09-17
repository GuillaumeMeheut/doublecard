import { useState } from 'react'
import { Rdb } from 'utils'

export function useDuno(baseGame, gameID) {
  const [game, setGame] = useState(baseGame)

  const updateData = () => {
    // Rdb.ref(`game/${gameID}/turn`).set()
  }

  const addCardOnStack = (card) => {
    Rdb.ref(`game/${gameID}/stack`).set(stack)
  }

  const randomizeTurn = () => {
    console.log(game)
    const players: any = Object.values(game.players)

    const id = players[Math.floor(Math.random() * players.length)].id
    Rdb.ref(`game/${gameID}/turn`).set(id)
    // updateData()
  }
  const passTurn = () => {
    updateData()
  }

  return { setGame, randomizeTurn }
}
