import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Result } from '@/types/fetch'
import { RolePermission, RolePermissionPayload } from '@/types/role-permission'
import { useMutation } from '@tanstack/react-query'

const createRolePermission = async (body: RolePermissionPayload) => {
    const response = await apiRequest.post('/role-permission/create', body)
    return response.data as Result<RolePermission>
}

export const useCreateRolePermission = () =>
    useMutation({
        mutationKey: [ApiKeys.Roles],
        mutationFn: createRolePermission,
    })
