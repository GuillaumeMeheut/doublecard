export interface DunoSetting {
  type: 'DUNO'
  // status: 'inGame' | 'inGame'
  status: string
  room_name: string
  nb_player: number
  round: number
  coin: number | string
  public: boolean
  pin?: string
}

export interface DunoSettingLobby extends DunoSetting {
  id: string
  players: Array<any>
}

export interface Player {
  hand: Array<CardDuno>
  id: string
  pseudo: string
  nbCard: number
}

export interface CardDuno {
  value: string
  color: string
}
export interface CardDunoStacks extends CardDuno {
  skin: string
}

export interface DunoSettingInGame {
  deck: Array<CardDuno>
  players: Array<Player>
  stack: Array<CardDunoStacks>
  turn: string
  invertSens: boolean
  color: string
  plus: number
  status: 'gameover' | 'playing'
  winner: string
}
