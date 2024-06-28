import { cookieValues } from '../constants'
import { getCookieValue } from './get-cookie-value'

export const getJWTtokens = () => {
    const accessToken = getCookieValue(cookieValues.accessToken)
    const refreshToken = getCookieValue(cookieValues.refreshToken)

    return {
        accessToken,
        refreshToken,
    }
}
