import { DataTable } from '@/components/data-table'
import { DebouncedInput } from '@/components/debounced-input'
import { TableActions } from '@/components/table-actions'
import { LimitSheet } from '@/modules/limits/limit-sheet/limit-sheet.tsx'
import { useLimit } from '@/modules/limits/limit/api/use-limit.ts'
import { getLimitColumns } from '@/modules/limits/limit/limit.columns.tsx'
import { useLimitPageTitle } from '@/shared/context/limits-page-title.tsx'
import { getCurrentYear } from '@/shared/lib/get-current-year.ts'
import { LIMITS } from '@/shared/router/routes.ts'
import { useEffect, useMemo, useState } from 'react'
import { useParams } from 'react-router-dom'

export const Limit = () => {
    const { id = '' } = useParams()
    const { data: limit, isLoading, isError } = useLimit(id)
    const { pageTitle, setPageTitle } = useLimitPageTitle()
    const [sheetOpen, setSheetOpen] = useState(false)

    useEffect(() => {
        setPageTitle(`Лимит ${id}`)
    }, [id])

    const breadcrumbsRoutes = useMemo(
        () => [
            { route: '/', label: 'Главная' },
            { route: LIMITS, label: 'Все-лимиты' },
            { route: `/${id}`, label: id },
        ],
        [id]
    )

    const limitTableColumns = useMemo(() => {
        if (limit?.created_at) {
            const currentYear = getCurrentYear(limit.created_at)
            return getLimitColumns(currentYear)
        }

        return getLimitColumns()
    }, [limit])

    if (isError) {
        return <p>Произошла ошибка</p>
    }

    return (
        <div className="mx-auto w-[95%]">
            <TableActions routes={breadcrumbsRoutes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput className="my-6" value="" onChange={() => void 0} />
            <DataTable
                columns={limitTableColumns}
                data={typeof limit === 'undefined' ? [] : [limit]}
                onRowClick={() => setSheetOpen(true)}
                isLoading={isLoading}
                skeletonsCount={1}
                withBackground
            />
            <LimitSheet title={pageTitle} open={sheetOpen} setOpen={setSheetOpen} />
        </div>
    )
}
