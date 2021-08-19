export interface DunoSetting {
  type: 'DUNO'
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
