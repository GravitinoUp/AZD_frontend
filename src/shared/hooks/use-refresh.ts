import { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getJWTtokens } from '../lib/get-jwt-tokens'
import { setCookieValue } from '../lib/set-cookie-value'
import { COOKIE_LIFETIME } from '../constants'
import { AUTH, REGISTER } from '../router/routes'
import { useRefreshToken } from '@/modules/auth/api/use-refresh-token'

export const useRefresh = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const {
        mutate: fetchRefresh,
        data: newAccessToken,
        error: refreshError,
        isSuccess: refreshSuccess,
    } = useRefreshToken()

    useEffect(() => {
        const { accessToken, refreshToken } = getJWTtokens()

        if (refreshToken) {
            if (!accessToken) {
                fetchRefresh({ refresh_token: `${refreshToken}` })
            }
        } else if (!accessToken) {
            navigate(AUTH, { replace: true })
        }
    }, [])

    useEffect(() => {
        if (refreshSuccess) {
            setCookieValue('accessToken', newAccessToken, COOKIE_LIFETIME)

            if (pathname === AUTH || pathname === REGISTER) {
                navigate('/', { replace: true })
            }
        }
    }, [refreshSuccess])

    useEffect(() => {
        if (refreshError) {
            navigate(AUTH, { replace: true })
        }
    }, [refreshError])
}
