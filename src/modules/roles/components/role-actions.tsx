import { Role } from '@/types/user'
import { Button } from '@/ui/button'
import { Popover, PopoverContent, PopoverItem, PopoverTrigger } from '@/ui/popover'
import { MoreVertical } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import EditIcon from '@/assets/icons/edit.svg'
import { useNavigate } from 'react-router-dom'
import { ROLE_MANAGE } from '@/shared/router/routes'

interface RoleActionsProps {
    role: Role
}

export const RoleActions = ({ role }: RoleActionsProps) => {
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
                            navigate(ROLE_MANAGE, {
                                state: {
                                    role,
                                },
                            })
                        }
                    >
                        <p>{t('action.edit')}</p>
                        <EditIcon />
                    </PopoverItem>
                </PopoverContent>
            </Popover>
        </div>
    )
}