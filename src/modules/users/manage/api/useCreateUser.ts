import { apiRequest } from '@/shared/api'
import { Data } from '@/types/fetch'
import { User, UserPayload } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

const createUser = async (body: UserPayload) => {
    const response = await apiRequest.post('/users', body)
    return response.data as Data<User>
}

export const useCreateUser = () =>
    useMutation({
        mutationKey: ['users'],
        mutationFn: createUser,
    })
