import { useDeck, useHand, useStack } from 'hooks'
import { useState } from 'react'
import { DunoSettingInGame } from 'types'
import { Rdb } from 'utils'

export function useDuno(gameID, user) {
  const [game, setGame] = useState<DunoSettingInGame>()

  const { deck, setDeck, drawCard } = useDeck(gameID)
  const { hand, setHand, draw, playCard } = useHand(drawCard, gameID)
  const { setStack, addCardOnStack } = useStack(gameID)

  const [colorVisible, setColorVisible] = useState<boolean>(false)

  const updateData = (parameters) => {
    const { turn, invertSens, color, plus } = parameters

    const updates = {}
    if (turn) updates[`game/${gameID}/turn`] = turn
    if (invertSens !== undefined)
      updates[`game/${gameID}/invertSens`] = invertSens
    if (color) updates[`game/${gameID}/color`] = color
    if (plus) updates[`game/${gameID}/plus`] = plus

    Rdb.ref().update(updates)
  }

  const playCardDuno = (index: number) => {
    let cardPlayed = hand[index]
    let lastCard = game.stack[game.stack.length - 1]

    if (game.turn === user.id) {
      if (game.plus !== 1) {
        if (cardPlayed.value !== '+2' && cardPlayed.value !== '+4') {
          cardPlayed.value = ''
          cardPlayed.color = ''
        }
      }
      if (
        cardPlayed.color === game.color ||
        cardPlayed.value === lastCard.value ||
        cardPlayed.color === lastCard.color ||
        cardPlayed.color === 'special'
      ) {
        addCardOnStack(playCard(index), user.skin)
        switch (cardPlayed.value) {
          case 'cross':
            deleteColor()
            resetPlus()
            passNextTurn()
            break
          case 'arrow':
            deleteColor()
            resetPlus()
            changeSens()
            endTurn()
            break
          case 'joker':
            setColorVisible(true)
            resetPlus()
            break
          case '+2':
            deleteColor()
            cardPlus(2)
            break
          case '+4':
            setColorVisible(true)
            cardPlus(4)
            break
          default:
            deleteColor()
            resetPlus()
            endTurn()
            break
        }
      }
    }
  }
  const drawDuno = () => {
    if (game.turn === user.id) {
      draw(game.plus)
      resetPlus()
      endTurn()
    }
  }

  //carte passer le tour
  const deleteColor = () => {
    if (game.color) {
      Rdb.ref(`game/${gameID}/color`).remove()
    }
  }

  //carte passer le tour
  const passNextTurn = () => {
    const players = Object.values(game.players)
    const index = players.findIndex((player) => player.id === game.turn)
    let id
    if (index === players.length - 1) {
      id = players[1].id
    } else if (index === players.length - 2) {
      id = players[0].id
    } else {
      id = players[index + 2].id
    }
    updateData({ turn: id })
  }

  //carte inverser le sens
  const changeSens = () => {
    updateData({ invertSens: !game.invertSens })
  }

  //carte choix des couleurs
  const selectColor = (color: string) => {
    setColorVisible(false)
    updateData({ color })
    endTurn()
  }

  //remettre a +1
  const resetPlus = () => {
    if (game.plus > 1) {
      updateData({ plus: 1 })
    }
  }

  //carte +2 ou +4
  const cardPlus = (nb: number) => {
    if (game.plus !== 1) nb += game.plus
    updateData({ plus: nb })
    endTurn()
  }

  //tour suivant
  const endTurn = () => {
    const players = Object.values(game.players)
    const index = players.findIndex((player) => player.id === game.turn)
    let id
    if (game.invertSens) {
      if (index === 0) {
        id = players[players.length - 1].id
      } else {
        id = players[index - 1].id
      }
    } else {
      if (index === players.length - 1) {
        id = players[0].id
      } else {
        id = players[index + 1].id
      }
    }
    updateData({ turn: id })
  }

  return {
    setGame,
    setDeck,
    setHand,
    setStack,
    deck,
    hand,
    colorVisible,
    playCardDuno,
    drawDuno,
    selectColor,
  }
}
