import { DataTable } from '@/components/data-table'
import { DebouncedInput } from '@/components/debounced-input'
import { TableActions } from '@/components/table-actions'
import { usePlan } from '@/modules/plans/plan/api/usePlan.ts'
import { planTableColumns } from '@/modules/plans/plan/plan-table-columns.tsx'
import { usePageTitle } from '@/shared/context/plans-page-title.tsx'
import { PLANS } from '@/shared/router/routes.ts'
import { useEffect, useMemo } from 'react'
import { useParams } from 'react-router-dom'

export const Plan = () => {
    const { id = '' } = useParams()
    const { data: plan, isLoading, isError } = usePlan(id)
    const { setPageTitle } = usePageTitle()

    useEffect(() => {
        setPageTitle(`План график ${id}`)
    }, [id])

    const breadcrumbsRoutes = useMemo(
        () => [
            { route: '/', label: 'Главная' },
            { route: PLANS, label: 'Планы-графики' },
            { route: `/${id}`, label: id },
        ],
        [id]
    )

    if (isError) {
        return <p>Произошла ошибка</p>
    }

    return (
        <div className="mx-auto w-[95%]">
            <TableActions routes={breadcrumbsRoutes} onExportClick={() => void 0} onImportClick={() => void 0} />
            <DebouncedInput className="my-6" value="" onChange={() => void 0} />
            <DataTable
                columns={planTableColumns}
                data={typeof plan === 'undefined' ? [] : [plan]}
                isLoading={isLoading}
                skeletonsCount={1}
                withBackground
            />
        </div>
    )
}
