import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Plan } from '@/types/plans.ts'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const getPlanById = async (id: string | number) => {
    const response: AxiosResponse<Plan> = await apiRequest.get(`/plan/${id}`)
    return response.data
}

export const usePlan = (id: string | number) =>
    useQuery({
        queryKey: [ApiKeys.Plans, id],
        queryFn: () => getPlanById(id),
    })
