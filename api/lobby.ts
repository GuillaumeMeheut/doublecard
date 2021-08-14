import axios from 'axios'

const createLobby = (setting, user) => {
  return axios.post('/api/lobby/create', { setting, user })
}

export { createLobby }
