import LogoutIcon from '@/assets/icons/navigation/logout.svg'
import SettingsIcon from '@/assets/icons/navigation/settings.svg'
import { UserAvatar } from '@/components/user/user-avatar.tsx'

import { SETTINGS } from '@/shared/router/routes.ts'
import { Link } from 'react-router-dom'

interface UserCardProps {
    expanded?: boolean
}

export const UserCard = ({ expanded }: UserCardProps) => {
    const handleLogout = () => {
        console.log('logout')
    }

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
                <p className="text-xs text-[#D2CFCF]">Администратор</p>
            </div>
            <div className="flex items-center gap-1">
                <Link
                    to={SETTINGS}
                    className="flex h-7 w-7 items-center justify-center rounded-full border border-[#2F4054] hover:opacity-60"
                >
                    <SettingsIcon />
                </Link>
                <button className="border-none hover:opacity-60" onClick={handleLogout}>
                    <LogoutIcon />
                </button>
            </div>
        </div>
    )
}
