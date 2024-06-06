import ArrowRightCircle from '@/assets/icons/arrow-right-circle.svg'
import EditIcon from '@/assets/icons/pen-square.svg'
import DeleteIcon from '@/assets/icons/red-recycle-bin.svg'
import { TableActions } from '@/components/table-actions'
import { SCHEDULES } from '@/shared/router/routes'
import { Button } from '@/ui/button.tsx'
import { useTranslation } from 'react-i18next'

const routes = [
    { route: '/', label: 'Главная' },
    { route: SCHEDULES, label: 'Планы-графики' },
]

export const PageContentHeader = () => {
    const { t } = useTranslation()

    return (
        <div>
            <div className="flex justify-center gap-3">
                <Button className="rounded-[10px]" onClick={() => void 0}>
                    <ArrowRightCircle />
                    <span className="ml-3">{t('send-to-EIS')}</span>
                </Button>
                <Button variant="secondary" onClick={() => void 0}>
                    <span className="mr-3">{t('edit')}</span>
                    <EditIcon />
                </Button>
                <Button variant="secondary" className="text-[#DE5A5A]" onClick={() => void 0}>
                    <span className="mr-3">{t('delete')}</span>
                    <DeleteIcon />
                </Button>
            </div>
            <TableActions routes={routes} onExportClick={() => void 0} onImportClick={() => void 0} />
        </div>
    )
}
