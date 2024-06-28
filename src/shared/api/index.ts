import axios from 'axios'
import { getCookieValue } from '../lib/get-cookie-value'
import { cookieValues } from '../constants'

export const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_API,
    headers: {
        Authorization: `Bearer ${getCookieValue(cookieValues.accessToken)}`,
    },
})
