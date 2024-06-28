import axios from 'axios'
import { getCookieValue } from '../lib/get-cookie-value'

export const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        Authorization: `Bearer ${getCookieValue('accessToken')}`,
    },
})
