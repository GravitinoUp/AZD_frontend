import { apiRequest } from '@/shared/api'
import { Result } from '@/types/fetch'
import { Organization, OrganizationPayload } from '@/types/organization'
import { useMutation } from '@tanstack/react-query'

const updateBranch = async (body: OrganizationPayload) => {
    const response = await apiRequest.patch('/branch', body)
    return response.data as Result<Organization>
}

export const useUpdateBranch = () =>
    useMutation({
        mutationKey: ['brnaches'],
        mutationFn: updateBranch,
    })
