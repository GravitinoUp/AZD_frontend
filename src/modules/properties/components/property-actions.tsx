import { Button } from '@/ui/button'
import { Popover, PopoverContent, PopoverItem, PopoverTrigger } from '@/ui/popover'
import { MoreVertical } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import EditIcon from '@/assets/icons/edit-circle.svg'
import { useNavigate } from 'react-router-dom'
import { PROPERTY_MANAGE } from '@/shared/router/routes'
import { Property } from '@/types/property'

interface PropertyActionsProps {
    property: Property
}

export const PropertyActions = ({ property }: PropertyActionsProps) => {
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
                            navigate(PROPERTY_MANAGE, {
                                state: {
                                    property,
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
