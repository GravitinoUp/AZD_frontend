import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Result } from '@/types/fetch'
import { User, UserPayload } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

const register = async (body: UserPayload) => {
    const response = await apiRequest.post('/users/register', body)
    return response.data as Result<User>
}

export const useRegister = () =>
    useMutation({
        mutationKey: [ApiKeys.Users],
        mutationFn: register,
    })