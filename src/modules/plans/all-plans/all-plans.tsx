import { DataTable } from '@/components/data-table'
import { DebouncedInput } from '@/components/debounced-input'
import { useAllPlans } from '@/modules/plans/all-plans/api/use-all-plans.ts'
import { allPlansColumns } from '@/modules/plans/all-plans/components/all-plans.columns.ts'
import { PageContentHeader } from '@/modules/plans/all-plans/components/page-content-header.tsx'
import { usePlanPageTitle } from '@/shared/context/plans-page-title.tsx'
import { PLANS } from '@/shared/router/routes.ts'
import { useEffect } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'

export const AllPlans = () => {
    const { t } = useTranslation()
    const navigate = useNavigate()
    const { data: plans = { count: 0, data: [] }, isLoading, isError } = useAllPlans()
    const { setPageTitle } = usePlanPageTitle()

    useEffect(() => {
        setPageTitle(t('plans'))
    }, [])

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
                data={plans.data}
                isLoading={isLoading}
                onRowClick={(rowData) => {
                    navigate(`${PLANS}/${rowData.plan_uuid}`)
                }}
                withBackground
            />
        </div>
    )
}
