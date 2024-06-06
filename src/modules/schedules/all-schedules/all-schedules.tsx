import { DataTable } from '@/components/data-table'
import { DebouncedInput } from '@/components/debounced-input'
import { useAllSchedules } from '@/modules/schedules/all-schedules/api/useAllSchedules.ts'
import { PageContentHeader } from '@/modules/schedules/all-schedules/components/page-content-header.tsx'
import { schedulesColumns } from '@/modules/schedules/all-schedules/components/schedules-columns.ts'
import { PLANS } from '@/shared/router/routes.ts'
import { useNavigate } from 'react-router-dom'

export const AllSchedules = () => {
    const navigate = useNavigate()
    const { data: schedules = [], isLoading, isError } = useAllSchedules()

    if (isError) {
        return <p>Произошлая ошибка. Данные не загрузились</p>
    }

    return (
        <div className="mx-auto w-[95%]">
            <PageContentHeader />
            <DebouncedInput className="my-6" value="" onChange={() => void 0} />
            <DataTable
                className="mb-10"
                columns={schedulesColumns}
                data={schedules}
                isLoading={isLoading}
                onRowClick={(rowData) => {
                    navigate(`${PLANS}/${rowData.plan_uuid}`)
                }}
                withBackground
            />
        </div>
    )
}
