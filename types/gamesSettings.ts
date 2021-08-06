export interface DunoSetting {
  type: 'DUNO'
  img: '/assets/init/duno.svg'
  room_name: string
  nb_player: number
  round: number
  public: boolean
  pin?: string
}

export interface DunoSettingLobby extends DunoSetting {
  _id: string
  players: Array<any>
}
