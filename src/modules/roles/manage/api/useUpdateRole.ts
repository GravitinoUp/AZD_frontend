import { apiRequest } from '@/shared/api'
import { Role } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

const updateRole = async (body: Role) => {
    const response = await apiRequest.patch('/roles', body)
    return response.data as Role
}

export const useUpdateRole = () =>
    useMutation({
        mutationKey: ['roles'],
        mutationFn: updateRole,
    })
