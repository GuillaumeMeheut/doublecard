export interface DunoSetting {
  type: 'DUNO'
  room_name: string
  nb_player: number
  round: number
  public: boolean
  pin?: string
}

export interface DunoSettingLobby extends DunoSetting {
  id: string
  players: Array<Player>
}
