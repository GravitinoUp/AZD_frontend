import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Limit } from '@/types/limits.ts'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const getLimitById = async (id: string | number) => {
    const response: AxiosResponse<Limit> = await apiRequest.get(`/limit/${id}`)
    return response.data
}

export const useLimit = (id: string | number) =>
    useQuery({
        queryKey: [ApiKeys.Limits, id],
        queryFn: () => getLimitById(id),
    })
