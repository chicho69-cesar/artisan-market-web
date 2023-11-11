import { serverUrl } from '@/modules/shared/constants'
import axios from 'axios'

export const api = axios.create({
  baseURL: `${serverUrl}/api`
})
