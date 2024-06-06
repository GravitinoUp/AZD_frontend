import { User } from '@/types/interface/user'
import { Button } from '@/ui/button'
import { Popover, PopoverContent, PopoverItem, PopoverTrigger } from '@/ui/popover'
import { MoreVertical } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import EditIcon from '@/assets/icons/edit.svg'
import DeleteIcon from '@/assets/icons/delete.svg'
import { useNavigate } from 'react-router-dom'
import { USER_MANAGE } from '@/shared/router/routes'

interface UserActionsProps {
    user: User
}

export const UserActions = ({ user }: UserActionsProps) => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <div className="flex justify-end">
            <Popover modal={false}>
                <PopoverTrigger asChild>
                    <Button variant="ghost" className="h-10 w-10 p-0">
                        <span className="sr-only">{t('action.dropdown.menu.open')}</span>
                        <MoreVertical className="h-5 w-5" />
                    </Button>
                </PopoverTrigger>
                <PopoverContent className="w-[250px] rounded-xl p-2" align="end">
                    <PopoverItem
                        onClick={() =>
                            navigate(USER_MANAGE, {
                                state: {
                                    user,
                                },
                            })
                        }
                    >
                        <p>{t('action.edit')}</p>
                        <EditIcon />
                    </PopoverItem>
                    <PopoverItem>
                        <p className="text-destructive">{t('action.delete')}</p>
                        <DeleteIcon />
                    </PopoverItem>
                </PopoverContent>
            </Popover>
        </div>
    )
}
