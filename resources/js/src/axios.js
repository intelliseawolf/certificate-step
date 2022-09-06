// axios
import axios from 'axios'

const baseURL = 'https://scoolio-backend-dev.track-progress.com/api'

export default axios.create({
  baseURL
})
