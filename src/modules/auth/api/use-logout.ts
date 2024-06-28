import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { RefreshPayload } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'

const logout = async (body: RefreshPayload) => {
    const response = await apiRequest.delete('/auth/logout', { data: body })
    return response.data as string
}

export const useLogout = () =>
    useMutation({
        mutationKey: [ApiKeys.Auth],
        mutationFn: logout,
    })
