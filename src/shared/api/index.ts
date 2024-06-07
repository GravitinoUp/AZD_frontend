import axios from 'axios'

export const apiRequest = axios.create({
    baseURL: import.meta.env.VITE_BASE_URL,
    headers: {
        Authorization:
            'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX3V1aWQiOiJkZjMzZTFmZS02NjRkLTRiZDEtYmYxNC0xMmU4Y2Y5OWU1YWMiLCJpc19hY3RpdmUiOnRydWUsImVtYWlsIjoidXNlcjFAbWFpbC5jb20iLCJwaG9uZSI6Iis3OTAwMDAwMDAwMCIsImlhdCI6MTcxNzc0Nzk5MywiZXhwIjoxNzE3NzkxMTkzfQ.NSCoY-ltjehQ2lbLwmeF6NjMA8adA5mH75iCpi2ck6s',
    },
})
