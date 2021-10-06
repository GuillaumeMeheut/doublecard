import axios from 'axios'

const endGameDuno = (winner, lobby) => {
  return axios.post(`/api/game/duno/end`, { winner, lobby })
}

export { endGameDuno }
