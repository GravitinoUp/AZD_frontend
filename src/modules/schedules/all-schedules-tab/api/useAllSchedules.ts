import { apiRequest } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

const getAllSchedules = async () => {
    const response = await apiRequest.get('/plan/all')
    return response.data
}

export const useAllSchedules = () =>
    useQuery({
        queryKey: ['schedules'],
        queryFn: getAllSchedules,
    })
