import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { placeholderQuery } from '@/shared/constants'
import { Data } from '@/types/fetch.ts'
import { Limit } from '@/types/limits.ts'
import { useQuery } from '@tanstack/react-query'
import { AxiosResponse } from 'axios'

const getAllLimits = async () => {
    const response: AxiosResponse<Data<Limit[]>> = await apiRequest.post('/limit/all', {
        body: placeholderQuery,
    })
    return response.data
}

export const useAllLimits = () =>
    useQuery({
        queryKey: [ApiKeys.Limits],
        queryFn: getAllLimits,
    })
