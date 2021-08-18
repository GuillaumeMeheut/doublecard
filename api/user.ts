import axios from 'axios'

const getUser = () => {
  return axios.get('/api/user/getUser')
}

export { getUser }
