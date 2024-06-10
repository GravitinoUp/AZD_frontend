import { apiRequest } from '@/shared/api'
import { RolePermission, RolePermissionPayload } from '@/types/role-permission'
import { useMutation } from '@tanstack/react-query'

const createRolePermission = async (body: RolePermissionPayload) => {
    const response = await apiRequest.post('/roles', body)
    return response.data as RolePermission
}

export const useCreateRolePermission = () =>
    useMutation({
        mutationKey: ['roles'],
        mutationFn: createRolePermission,
    })
