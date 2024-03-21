const colorsDuno = ['blue', 'red', 'yellow', 'green']
const valuesDuno = [
  '0',
  '1',
  '1',
  '2',
  '2',
  '3',
  '3',
  '4',
  '4',
  '5',
  '5',
  '6',
  '6',
  '7',
  '7',
  '8',
  '8',
  '9',
  '9',
  'cross',
  'cross',
  'arrow',
  'arrow',
  '+2',
  '+2',
]

const specialCardDuno = [
  { color: 'special', value: '+4' },
  { color: 'special', value: '+4' },
  { color: 'special', value: '+4' },
  { color: 'special', value: '+4' },
  { color: 'special', value: 'joker' },
  { color: 'special', value: 'joker' },
  { color: 'special', value: 'joker' },
  { color: 'special', value: 'joker' },
]

export function getDunoDeck() {
  const deck = []

  for (let i = 0; i < colorsDuno.length; i++) {
    for (let x = 0; x < valuesDuno.length; x++) {
      const card = { value: valuesDuno[x], color: colorsDuno[i] }
      deck.push(card)
    }
  }

  specialCardDuno.forEach((card) => deck.push(card))

  return deck
}

export const shuffleDeck = (deck) => {
  for (let i = 0; i < 500; i++) {
    const location1 = Math.floor(Math.random() * deck.length)
    const location2 = Math.floor(Math.random() * deck.length)
    const tmp = deck[location1]

    deck[location1] = deck[location2]
    deck[location2] = tmp
  }
  return deck
}

export const dealCards = (deck, nb: number) => {
  const hand = []
  for (let i = 0; i < nb; i++) {
    const card = deck.splice(Math.floor(Math.random() * deck.length), 1)[0]
    hand.push(card)
  }
  return { deck, hand }
}
