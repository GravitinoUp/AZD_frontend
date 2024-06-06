import { apiRequest } from '@/shared/api'
import { CountResponse } from '@/types/common.ts'
import { Schedule } from '@/types/schedules.ts'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const getAllSchedules = async () => {
    const response: AxiosResponse<CountResponse<Schedule[]>> = await apiRequest.get('/plan/all')
    return response.data
}

export const useAllSchedules = () =>
    useQuery({
        queryKey: ['schedules'],
        queryFn: getAllSchedules,
        select: (data) => data.data,
    })
