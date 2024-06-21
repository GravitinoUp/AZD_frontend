import { DataTable } from '@/components/data-table'
import { DebouncedInput } from '@/components/debounced-input'
import { ErrorAlert } from '@/components/error-alert'
import { TableActions } from '@/components/table-actions'
import { AllLimitsColumns } from '@/modules/limits/all-limits/all-limits.columns.ts'
import { useAllLimits } from '@/modules/limits/all-limits/api/use-all-limits.ts'
import { useLimitPageTitle } from '@/shared/context/limits-page-title.tsx'
import { LIMITS } from '@/shared/router/routes.ts'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

const breadcrumbsRoutes = [
    { route: '/', label: 'Главная' },
    { route: LIMITS, label: 'Все лимиты' },
]

export const AllLimits = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { data: limits = { count: 0, data: [] }, isLoading, isError } = useAllLimits()
    const { setPageTitle } = useLimitPageTitle()

    useEffect(() => {
        setPageTitle(t('all-limits'))
    }, [])

    if (isError) {
        return <ErrorAlert className="mx-auto" />
    }

    return (
        <div className="mx-auto w-[95%]">
            <TableActions routes={breadcrumbsRoutes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput className="my-6" value="" onChange={() => void 0} />
            <DataTable
                className="mb-10"
                columns={AllLimitsColumns}
                data={limits.data}
                isLoading={isLoading}
                onRowClick={(rowData) => {
                    navigate(`${LIMITS}/${rowData.limit_uuid}`)
                }}
                withBackground
            />
        </div>
    )
}
