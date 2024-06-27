import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data, Payload } from '@/types/fetch.ts'
import { Property, PropertySort } from '@/types/property'
import { useQuery } from '@tanstack/react-query'

const getAllProperties = async (body: Payload<Property, PropertySort>) => {
    const response = await apiRequest.post('/property/all', body)
    return response.data as Data<Property[]>
}

export const useGetAllProperties = (body: Payload<Property, PropertySort>) =>
    useQuery({
        queryKey: [ApiKeys.Branches, body],
        queryFn: () => getAllProperties(body),
    })
