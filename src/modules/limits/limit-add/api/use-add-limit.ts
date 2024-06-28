import { apiRequest } from '@/shared/api'
import { Result } from '@/types/fetch.ts'
import { Limit, NewLimitBody } from '@/types/limits.ts'
import { useMutation } from '@tanstack/react-query'

const addLimit = async (body: NewLimitBody) => {
    const response = await apiRequest.post('/limit', body)
    return response.data as Result<Limit>
}

export const useAddLimit = () =>
    useMutation({
        mutationKey: ['limits'],
        mutationFn: addLimit,
    })
