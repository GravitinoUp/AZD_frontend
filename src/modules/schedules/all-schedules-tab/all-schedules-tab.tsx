import { DataTable } from '@/components/data-table'
import { DebouncedInput } from '@/components/debounced-input'
import { useAllSchedules } from '@/modules/schedules/all-schedules-tab/api/useAllSchedules.ts'
import { schedulesColumns } from '@/modules/schedules/all-schedules-tab/components/schedules-columns.ts'
import { PageContentHeader } from './components/page-content-header'

export const AllSchedulesTab = () => {
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
                data={schedules.data}
                isLoading={isLoading}
                withBackground
            />
        </div>
    )
}
