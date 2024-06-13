import axios from 'axios'

export const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3V1aWQiOiJkZjMzZTFmZS02NjRkLTRiZDEtYmYxNC0xMmU4Y2Y5OWU1YWMiLCJpc19hY3RpdmUiOnRydWUsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJwaG9uZSI6Iis3OTAwMDAwMDAwMCIsImlhdCI6MTcxODA5MTMxNSwiZXhwIjoxNzE4MTM0NTE1fQ.BAUIiiUzS7fDla00mqV3syOnec1v-_h-m9lD1Ub7bTY',
    },
})
