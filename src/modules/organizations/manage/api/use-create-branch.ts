import { apiRequest } from '@/shared/api'
import { Result } from '@/types/fetch'
import { Organization, OrganizationPayload } from '@/types/organization'
import { useMutation } from '@tanstack/react-query'

const createBranch = async (body: OrganizationPayload) => {
    const response = await apiRequest.post('/branch', body)
    return response.data as Result<Organization>
}

export const useCreateBranch = () =>
    useMutation({
        mutationKey: ['branches'],
        mutationFn: createBranch,
    })
