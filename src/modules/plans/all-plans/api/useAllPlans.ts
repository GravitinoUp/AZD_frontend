import { apiRequest } from '@/shared/api'
import { Data } from '@/types/fetch.ts'
import { Plan } from '@/types/plans.ts'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const getAllPlans = async () => {
    const response: AxiosResponse<Data<Plan[]>> = await apiRequest.get('/plan/all')
    return response.data
}

export const useAllPlans = () =>
    useQuery({
        queryKey: ['plans'],
        queryFn: getAllPlans,
        select: (data) => data.data,
    })
