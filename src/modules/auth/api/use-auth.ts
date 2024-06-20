import { apiRequest } from '@/shared/api'
import { AuthPayload, JWT } from '@/types/auth'
import { useMutation } from '@tanstack/react-query'

const auth = async (body: AuthPayload) => {
    const response = await apiRequest.post('/auth', body)
    return response.data as JWT
}

export const useAuth = () =>
    useMutation({
        mutationKey: ['auth'],
        mutationFn: auth,
    })
