import { User } from '@/types/user.ts'
import { Switch } from '@/ui/switch'
import { useChangeUserStatus } from '../api/use-change-user-status'
import { useMemo } from 'react'
import { useTranslation } from 'react-i18next'
import { useSuccessToast } from '@/shared/hooks/use-success-toast'
import { useErrorToast } from '@/shared/hooks/use-error-toast'

export default function UserSwitch({ user }: { user: User }) {
    const { t } = useTranslation()

    const {
        mutate: changeUserStatus,
        isPending: userUpdating,
        error: userUpdateError,
        isSuccess: userUpdateSuccess,
    } = useChangeUserStatus()

    const updateStatus = () => {
        changeUserStatus({
            user_uuid: user.user_uuid,
            is_active: !user.is_active,
        })
    }

    const updateSuccessMessage = useMemo(() => t('toast.success.update.m', { entity: t('user') }), [])

    useSuccessToast(updateSuccessMessage, userUpdateSuccess)
    useErrorToast(void 0, userUpdateError)

    return <Switch disabled={userUpdating} checked={user.is_active} onCheckedChange={updateStatus} />
}
