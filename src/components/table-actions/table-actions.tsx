import ExportIcon from '@/assets/icons/arrow-circle-export.svg'
import ImportIcon from '@/assets/icons/arrow-circle-import.svg'
import { Route } from '@/types/common.ts'
import { Button } from '@/ui/button'
import { useTranslation } from 'react-i18next'
import { Breadcrumbs } from '../breadcrumbs/breadcrumbs'

interface TableActionsProps {
    routes: Route[]
    onExportClick: () => void
    onImportClick: () => void
}

export const TableActions = ({ routes, onExportClick, onImportClick }: TableActionsProps) => {
    const { t } = useTranslation()

    return (
        <div className="mt-10 flex items-center justify-between">
            <Breadcrumbs routes={routes} />
            <div className="flex gap-3">
                <Button variant="secondary" onClick={onExportClick}>
                    <span className="mr-3">{t('export')}</span>
                    <ExportIcon />
                </Button>
                <Button variant="secondary" onClick={onImportClick}>
                    <span className="mr-3">{t('import')}</span>
                    <ImportIcon />
                </Button>
            </div>
        </div>
    )
}
