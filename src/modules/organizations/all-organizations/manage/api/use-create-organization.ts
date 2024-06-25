import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Result } from '@/types/fetch'
import { Organization, OrganizationPayload } from '@/types/organization'
import { useMutation } from '@tanstack/react-query'

const createOrganization = async (body: OrganizationPayload) => {
    const response = await apiRequest.post('/organization', body)
    return response.data as Result<Organization>
}

export const useCreateOrganization = () =>
    useMutation({
        mutationKey: [ApiKeys.Organizations],
        mutationFn: createOrganization,
    })
