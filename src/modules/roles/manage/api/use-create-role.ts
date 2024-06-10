import { apiRequest } from '@/shared/api'
import { Result } from '@/types/fetch'
import { Role } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

const createRole = async (body: Partial<Role>) => {
    const response = await apiRequest.post('/roles', body)
    return response.data as Result<Role>
}

export const useCreateRole = () =>
    useMutation({
        mutationKey: ['roles'],
        mutationFn: createRole,
    })
