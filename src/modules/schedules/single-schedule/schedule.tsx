import { DataTable } from '@/components/data-table'
import { useSchedule } from '@/modules/schedules/single-schedule/api/useSchedule.ts'
import { scheduleTableColumns } from '@/modules/schedules/single-schedule/schedule-table-columns.tsx'
import { useParams } from 'react-router-dom'

export const Schedule = () => {
    const { id = '' } = useParams()
    const { data: schedule, isLoading, isError, isSuccess } = useSchedule(id)

    if (isError) {
        return <p>Произошла ошибка</p>
    }

    return isSuccess ? (
        <div className="mx-auto w-[95%]">
            <DataTable columns={scheduleTableColumns} data={[schedule]} isLoading={isLoading} withBackground />
        </div>
    ) : (
        <p>ничего не найдено</p>
    )
}
