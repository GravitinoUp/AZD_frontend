import { apiRequest } from '@/shared/api'
import { Branch } from '@/types/branch'
import { Result } from '@/types/fetch'
import { useMutation } from '@tanstack/react-query'

const createBranch = async (body: Partial<Branch>) => {
    const response = await apiRequest.post('/branch', body)
    return response.data as Result<Branch>
}

export const useCreateBranch = () =>
    useMutation({
        mutationKey: ['branches'],
        mutationFn: createBranch,
    })
