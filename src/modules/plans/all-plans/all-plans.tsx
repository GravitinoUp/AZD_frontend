import { DataTable } from '@/components/data-table'
import { DebouncedInput } from '@/components/debounced-input'
import { useAllPlans } from '@/modules/plans/all-plans/api/useAllPlans.ts'
import { allPlansColumns } from '@/modules/plans/all-plans/components/all-plans-columns.ts'
import { PageContentHeader } from '@/modules/plans/all-plans/components/page-content-header.tsx'
import { PLANS } from '@/shared/router/routes.ts'
import { useNavigate } from 'react-router-dom'

export const AllPlans = () => {
    const navigate = useNavigate()
    const { data: plans = [], isLoading, isError } = useAllPlans()

    if (isError) {
        return <p>Произошлая ошибка. Данные не загрузились</p>
    }

    return (
        <div className="mx-auto w-[95%]">
            <PageContentHeader />
            <DebouncedInput className="my-6" value="" onChange={() => void 0} />
            <DataTable
                className="mb-10"
                columns={allPlansColumns}
                data={plans}
                isLoading={isLoading}
                onRowClick={(rowData) => {
                    navigate(`${PLANS}/${rowData.plan_uuid}`)
                }}
                withBackground
            />
        </div>
    )
}
