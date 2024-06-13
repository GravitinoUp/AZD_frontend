import axios from 'axios'

export const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3V1aWQiOiJkZjMzZTFmZS02NjRkLTRiZDEtYmYxNC0xMmU4Y2Y5OWU1YWMiLCJpc19hY3RpdmUiOnRydWUsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJwaG9uZSI6Iis3OTAwMDAwMDAwMCIsImlhdCI6MTcxODI2NDk4NiwiZXhwIjoxNzE4MzA4MTg2fQ.eF6jwuPA2vb37H3oUF8fQ6rmLC1y8F-a3RGpoOGPWPQ',
    },
})
