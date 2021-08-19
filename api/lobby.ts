import axios from 'axios'

const createLobby = (setting, user) => {
  return axios.post('/api/lobby/create', { setting, user })
}

const joinRoomApi = (lobby, user) => {
  return axios.post('/api/lobby/join', { lobby, user })
}

export { createLobby, joinRoomApi }
