import { apiRequest } from '@/shared/api'
import { Result } from '@/types/fetch'
import { Role, RoleUpdatePayload } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

const updateRole = async (body: RoleUpdatePayload) => {
    const response = await apiRequest.patch('/roles', body)
    return response.data as Result<Role>
}

export const useUpdateRole = () =>
    useMutation({
        mutationKey: ['roles'],
        mutationFn: updateRole,
    })
