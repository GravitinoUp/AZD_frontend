import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Branch, BranchPayload } from '@/types/branch'
import { Result } from '@/types/fetch'
import { useMutation } from '@tanstack/react-query'

const updateBranch = async (body: BranchPayload) => {
    const response = await apiRequest.patch('/branch', body)
    return response.data as Result<Branch>
}

export const useUpdateBranch = () =>
    useMutation({
        mutationKey: [ApiKeys.Branches],
        mutationFn: updateBranch,
    })
