import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { RefreshPayload } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'

const refreshToken = async (body: RefreshPayload) => {
    const response = await apiRequest.post('/auth/refresh', body)
    return response.data as string
}

export const useRefreshToken = () =>
    useMutation({
        mutationKey: [ApiKeys.Auth],
        mutationFn: refreshToken,
    })
