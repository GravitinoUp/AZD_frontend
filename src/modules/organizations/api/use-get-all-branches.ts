import { apiRequest } from '@/shared/api'
import { Data, Payload } from '@/types/fetch.ts'
import { Organization, OrganizationSort } from '@/types/organization'
import { useQuery } from '@tanstack/react-query'

const getAllBranches = async (body: Payload<Organization, OrganizationSort>) => {
    const response = await apiRequest.post('/branch/all', body)
    return response.data as Data<Organization[]>
}

export const useGetAllBranches = (body: Payload<Organization, OrganizationSort>) =>
    useQuery({
        queryKey: ['branches', body],
        queryFn: () => getAllBranches(body),
    })
