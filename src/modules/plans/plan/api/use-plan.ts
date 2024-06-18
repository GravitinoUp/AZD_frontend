import { apiRequest } from '@/shared/api'
import { Plan } from '@/types/plans.ts'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const getPlanById = async (id: string | number) => {
    const response: AxiosResponse<Plan> = await apiRequest.get(`/plan/${id}`)
    return response.data
}

export const usePlan = (id: string | number) =>
    useQuery({
        queryKey: ['plans', id],
        queryFn: () => getPlanById(id),
    })
