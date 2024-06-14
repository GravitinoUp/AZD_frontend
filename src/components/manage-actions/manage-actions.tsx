import { Button } from '@/ui/button'
import PlusCircleIcon from '@/assets/icons/plus-circle.svg'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

interface ManageActionsProps {
    loading?: boolean
    editing?: boolean
}

export const ManageActions = ({ loading = false, editing = false }: ManageActionsProps) => {
    const { t } = useTranslation()
    const navigate = useNavigate()

    return (
        <>
            <Button className="h-12 w-[200px] gap-4" loading={loading}>
                <PlusCircleIcon />
                {editing ? t('action.edit') : t('action.add')}
            </Button>
            <Button
                className="h-12 w-[200px] bg-secondary text-destructive"
                variant="outline"
                type="button"
                onClick={() => navigate(-1)}
            >
                {t('action.cancel')}
            </Button>
        </>
    )
}
