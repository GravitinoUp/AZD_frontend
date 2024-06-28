import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Result } from '@/types/fetch'
import { Property, PropertyPayload } from '@/types/property'
import { useMutation } from '@tanstack/react-query'

const createProperty = async (body: Partial<PropertyPayload>) => {
    const response = await apiRequest.post('/property', body)
    return response.data as Result<Property>
}

export const useCreateProperty = () =>
    useMutation({
        mutationKey: [ApiKeys.Properties],
        mutationFn: createProperty,
    })
