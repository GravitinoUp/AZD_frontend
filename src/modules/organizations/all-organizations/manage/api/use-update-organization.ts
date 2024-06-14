import { apiRequest } from '@/shared/api'
import { Result } from '@/types/fetch'
import { Organization, OrganizationPayload } from '@/types/organization'
import { useMutation } from '@tanstack/react-query'

const updateOrganization = async (body: OrganizationPayload) => {
    const response = await apiRequest.patch('/organization', body)
    return response.data as Result<Organization>
}

export const useUpdateOrganization = () =>
    useMutation({
        mutationKey: ['organizations'],
        mutationFn: updateOrganization,
    })