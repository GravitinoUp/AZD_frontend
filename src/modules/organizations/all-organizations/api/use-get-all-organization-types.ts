import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data } from '@/types/fetch.ts'
import { OrganizationType } from '@/types/organization'
import { useQuery } from '@tanstack/react-query'

const getAllOrganizationTypes = async () => {
    const response = await apiRequest.get('/organization-type/all')
    return response.data as Data<OrganizationType[]>
}

export const useGetAllOrganizationTypes = () =>
    useQuery({
        queryKey: [ApiKeys.OrganizationTypes],
        queryFn: getAllOrganizationTypes,
        select: (data) => data.data,
    })
