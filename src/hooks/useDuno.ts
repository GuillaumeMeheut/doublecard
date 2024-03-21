import { useEffect, useState } from 'react'
import { DunoSettingInGame } from '../types'
import { Rdb } from '../utils'
import { useDeck, useHand, useStack } from '.'

export function useDuno(gameID, user) {
  const [game, setGame] = useState<DunoSettingInGame>()
  const [lobby, setLobby] = useState()

  const { deck, setDeck, drawCard } = useDeck(gameID)
  const { hand, setHand, draw, playCard } = useHand(drawCard, gameID)
  const { setStack, addCardOnStack } = useStack(gameID)

  const [colorVisible, setColorVisible] = useState<boolean>(false)

  // useEffect(() => {
  //   if (game) {
  //     console.log(game.players[user.id].hand)
  //     if (game.players[user.id].hand === undefined) {
  //       updateData({ status: 'gameover', winner: user.id })
  //     }
  //   }
  // }, [game.players[user.id].hand])

  useEffect(() => {
    if (game) {
      if (game.players[user.id].hand === undefined) {
        updateData({ status: 'gameover', winner: user.id })
      }
      if (game.status === 'gameover' && game.winner) {
        gameOver()
      }
    }
  }, [game])

  const updateData = (parameters) => {
    const { turn, invertSens, color, plus, status, winner } = parameters

    const updates = {}
    if (turn) updates[`game/${gameID}/turn`] = turn
    if (invertSens !== undefined)
      updates[`game/${gameID}/invertSens`] = invertSens
    if (color) updates[`game/${gameID}/color`] = color
    if (plus) updates[`game/${gameID}/plus`] = plus
    if (status) updates[`game/${gameID}/status`] = status
    if (winner) updates[`game/${gameID}/winner`] = winner

    Rdb.ref().update(updates)
  }

  const playCardDuno = (index: number) => {
    let cardPlayed = hand[index]
    let lastCard = game.stack[game.stack.length - 1]

    if (game.turn === user.id && game.status !== 'gameover') {
      if (
        game.plus !== 1 &&
        (cardPlayed.value === '+2' || cardPlayed.value === '+4')
      ) {
        //a refactoriser
        addCardOnStack(playCard(index), user.skin)
        switch (cardPlayed.value) {
          case '+2':
            deleteColor()
            cardPlus(2)
            endTurn()
            break
          case '+4':
            setColorVisible(true)
            cardPlus(4)
            break
        }
      } else if (
        game.plus === 1 &&
        (cardPlayed.color === game.color ||
          cardPlayed.value === lastCard.value ||
          cardPlayed.color === lastCard.color ||
          cardPlayed.color === 'special')
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
            endTurn()
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
  //fin du jeu
  const gameOver = () => {
    if (game.winner === user.id) endGameDuno(game.winner, lobby, gameID)
    //faire pop la popup du gagnant
  }

  return {
    setGame,
    setLobby,
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
