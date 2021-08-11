import axios from 'axios'

export const api = axios.create({
  baseURL: '/api' //'https://api-ajudai.herokuapp.com/api'
})
