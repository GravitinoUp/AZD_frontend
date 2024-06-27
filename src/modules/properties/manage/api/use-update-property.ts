import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Result } from '@/types/fetch'
import { Property, PropertyPayload } from '@/types/property'
import { useMutation } from '@tanstack/react-query'

const updateProperty = async (body: Partial<PropertyPayload>) => {
    const response = await apiRequest.patch('/property', body)
    return response.data as Result<Property>
}

export const useUpdateProperty = () =>
    useMutation({
        mutationKey: [ApiKeys.Properties],
        mutationFn: updateProperty,
    })
