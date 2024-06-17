import { apiRequest } from '@/shared/api'
import { Result } from '@/types/fetch'
import { Role, RolePayload } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

const updateRole = async (body: RolePayload) => {
    const response = await apiRequest.patch('/roles', body)
    return response.data as Result<Role>
}

export const useUpdateRole = () =>
    useMutation({
        mutationKey: ['roles'],
        mutationFn: updateRole,
    })
