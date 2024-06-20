import { useRefreshToken } from '@/modules/auth/api/use-refresh-token'
import { SideBar } from '@/modules/sidebar'
import { cn } from '@/shared/lib/cn.ts'
import { getJWTtokens } from '@/shared/lib/get-jwt-tokens'
import { setCookieValue } from '@/shared/lib/set-cookie-value'
import { AUTH, DASHBOARD, REGISTER } from '@/shared/router/routes'
import { Toaster } from '@/ui/toaster.tsx'
import { useEffect, useState } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'

export const Layout = () => {
    const navigate = useNavigate()
    const { pathname } = useLocation()

    const [sidebarExpanded, setSidebarExpanded] = useState(false)

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
            setCookieValue('accessToken', newAccessToken, '43200')

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

    return (
        <>
            <SideBar expanded={sidebarExpanded} setExpanded={setSidebarExpanded} />
            <main className={cn('w-full pb-10 text-center', sidebarExpanded ? 'pl-[380px]' : 'pl-[120px]')}>
                <Outlet />
            </main>
            <Toaster />
        </>
    )
}
