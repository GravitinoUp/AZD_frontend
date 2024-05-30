import axios from 'axios'

export const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
})
