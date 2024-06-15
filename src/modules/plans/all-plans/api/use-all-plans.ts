import { apiRequest } from '@/shared/api'
import { placeholderQuery } from '@/shared/constants'
import { Data } from '@/types/fetch.ts'
import { Plan } from '@/types/plans.ts'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const getAllPlans = async () => {
    const response: AxiosResponse<Data<Plan[]>> = await apiRequest.post('/plan/all', {
        body: placeholderQuery,
    })
    return response.data
}

export const useAllPlans = () =>
    useQuery({
        queryKey: ['plans'],
        queryFn: getAllPlans,
    })
