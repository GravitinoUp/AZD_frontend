import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Branch, BranchPayload } from '@/types/branch'
import { Result } from '@/types/fetch'
import { useMutation } from '@tanstack/react-query'

const createBranch = async (body: BranchPayload) => {
    const response = await apiRequest.post('/branch', body)
    return response.data as Result<Branch>
}

export const useCreateBranch = () =>
    useMutation({
        mutationKey: [ApiKeys.Branches],
        mutationFn: createBranch,
    })
