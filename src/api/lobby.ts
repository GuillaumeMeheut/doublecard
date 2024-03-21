import axios from 'axios'

const createLobby = (setting, user) => {
  return axios.post('/api/lobby/create', { setting, user })
}

const joinRoomApi = (lobby, user) => {
  return axios.post('/api/lobby/join', { lobby, user })
}
const leaveRoomApi = (lobby, user) => {
  return axios.post('/api/lobby/leave', { lobby, user })
}

const startGameApi = (lobby) => {
  return axios.post(`/api/lobby/${lobby.type.toLowerCase()}/start`, { lobby })
}

export { createLobby, joinRoomApi, leaveRoomApi, startGameApi }
