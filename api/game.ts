import axios from 'axios'

const endGameDuno = (winner, lobby, gameID) => {
  return axios.post(`/api/game/duno/end`, { winner, lobby, gameID })
}

export { endGameDuno }
