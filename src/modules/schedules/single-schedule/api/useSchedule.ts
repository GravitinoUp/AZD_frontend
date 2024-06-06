import { apiRequest } from '@/shared/api'
import { Schedule } from '@/types/schedules.ts'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const getScheduleById = async (id: string | number) => {
    const response: AxiosResponse<Schedule> = await apiRequest.get(`/plan/${id}`)
    return response.data
}

export const useSchedule = (id: string | number) =>
    useQuery({
        queryKey: ['schedules', id],
        queryFn: () => getScheduleById(id),
    })
