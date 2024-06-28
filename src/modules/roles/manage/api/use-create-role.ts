import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Result } from '@/types/fetch'
import { Role, RolePayload } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

const createRole = async (body: Partial<RolePayload>) => {
    const response = await apiRequest.post('/roles', body)
    return response.data as Result<Role>
}

export const useCreateRole = () =>
    useMutation({
        mutationKey: [ApiKeys.Roles],
        mutationFn: createRole,
    })
