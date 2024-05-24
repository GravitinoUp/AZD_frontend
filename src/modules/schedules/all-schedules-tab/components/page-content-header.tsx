import ExportIcon from '@/assets/icons/arrow-circle-export.svg'
import ImportIcon from '@/assets/icons/arrow-circle-import.svg'
import ArrowRightCircle from '@/assets/icons/arrow-right-circle.svg'
import EditIcon from '@/assets/icons/pen-square.svg'
import DeleteIcon from '@/assets/icons/red-recycle-bin.svg'
import { Button } from '@/ui/button.tsx'
import { useTranslation } from 'react-i18next'

export const PageContentHeader = () => {
    const { t } = useTranslation()

    return (
        <div className="flex items-center justify-between">
            <div>Breadcrumbs placeholder</div>
            <div className="flex gap-3">
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
            <div className="flex gap-3">
                <Button variant="secondary" onClick={() => void 0}>
                    <span className="mr-3">{t('export')}</span>
                    <ExportIcon />
                </Button>
                <Button variant="secondary" onClick={() => void 0}>
                    <span className="mr-3">{t('import')}</span>
                    <ImportIcon />
                </Button>
            </div>
        </div>
    )
}
