import { apiRequest } from '@/shared/api'
import { RefreshPayload } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'

const logout = async (body: RefreshPayload) => {
    const response = await apiRequest.post('/auth/logout', body)
    return response.data as string
}

export const useLogout = () =>
    useMutation({
        mutationKey: ['auth'],
        mutationFn: logout,
    })
