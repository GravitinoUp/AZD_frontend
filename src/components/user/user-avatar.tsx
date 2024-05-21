import avatarPlaceholderSrc from '@/assets/images/avatar-placeholder.png'
import { PROFILE } from '@/shared/router/routes.ts'
import { Link } from 'react-router-dom'

export const UserAvatar = () => {
    const userAvatar = false // брать с сервера

    return (
        <Link to={PROFILE} className="flex-center h-11 w-11 rounded-full border-2 border-white hover:opacity-60">
            {userAvatar ? (
                userAvatar
            ) : (
                <img className="h-full w-full rounded-full" src={avatarPlaceholderSrc} alt="user avatar" />
            )}
        </Link>
    )
}
