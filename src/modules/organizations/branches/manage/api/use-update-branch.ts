import { apiRequest } from '@/shared/api'
import { Branch } from '@/types/branch'
import { Result } from '@/types/fetch'
import { useMutation } from '@tanstack/react-query'

const updateBranch = async (body: Partial<Branch>) => {
    const response = await apiRequest.patch('/branch', body)
    return response.data as Result<Branch>
}

export const useUpdateBranch = () =>
    useMutation({
        mutationKey: ['branches'],
        mutationFn: updateBranch,
    })
