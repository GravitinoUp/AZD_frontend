import LogoutIcon from '@/assets/icons/navigation/logout.svg'
import SettingsIcon from '@/assets/icons/navigation/settings.svg'
import { UserAvatar } from '@/components/user/user-avatar.tsx'
import { useLogout } from '@/modules/auth/api/use-logout'
import { cookieValues } from '@/shared/constants'
import { useErrorToast } from '@/shared/hooks/use-error-toast'
import { getJWTtokens } from '@/shared/lib/get-jwt-tokens'
import { removeCookieValue } from '@/shared/lib/remove-cookie-value'

import { AUTH, SETTINGS } from '@/shared/router/routes.ts'
import { Button } from '@/ui/button'
import { useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'

interface UserCardProps {
    expanded?: boolean
}

export const UserCard = ({ expanded }: UserCardProps) => {
    const navigate = useNavigate()
    const { mutate: logoutUser, isPending: logoutPending, error: logoutError, isSuccess: logoutSuccess } = useLogout()

    const handleLogout = () => {
        const { refreshToken } = getJWTtokens()

        if (refreshToken) {
            logoutUser({ refresh_token: refreshToken })
        } else {
            removeCookieValue(cookieValues.accessToken)
            navigate(AUTH, { replace: true })
        }
    }

    useEffect(() => {
        if (logoutSuccess) {
            removeCookieValue(cookieValues.accessToken)
            removeCookieValue(cookieValues.refreshToken)

            navigate(AUTH, { replace: true })
        }
    }, [logoutSuccess])

    useErrorToast(logoutError)

    if (!expanded) {
        return (
            <div className="my-8">
                <UserAvatar />
            </div>
        )
    }

    return (
        <div className="my-8 flex h-[74px] w-[340px] items-center justify-around rounded-2xl border border-[#2F4054] shadow-custom">
            <UserAvatar />
            <div>
                <p className="text-sm text-white">Иванов Иван Иванович</p>
                <p className="text-xs text-caption">Администратор</p>
            </div>
            <div className="flex items-center gap-1">
                <Link
                    to={SETTINGS}
                    className="flex-center h-7 w-7 rounded-full border border-[#2F4054] hover:bg-accent/20"
                >
                    <SettingsIcon />
                </Link>
                <Button
                    variant="ghost"
                    size="icon"
                    className="h-7 w-7 border-none hover:bg-accent/20"
                    onClick={handleLogout}
                    disabled={logoutPending}
                >
                    <LogoutIcon />
                </Button>
            </div>
        </div>
    )
}
