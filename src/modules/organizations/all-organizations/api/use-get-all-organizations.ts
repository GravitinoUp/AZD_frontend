import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data, Payload } from '@/types/fetch.ts'
import { Organization, OrganizationSort } from '@/types/organization'
import { useQuery } from '@tanstack/react-query'

const getAllOrganizations = async (body: Payload<Organization, OrganizationSort>) => {
    const response = await apiRequest.post('/organization/all', body)
    return response.data as Data<Organization[]>
}

export const useGetAllOrganizations = (body: Payload<Organization, OrganizationSort>) =>
    useQuery({
        queryKey: [ApiKeys.Organizations, body],
        queryFn: () => getAllOrganizations(body),
    })
