import { apiRequest } from '@/shared/api'
import { Data } from '@/types/interface/fetch'
import { User, UserPayload } from '@/types/interface/user'
import { useMutation } from '@tanstack/react-query'

const updateUser = async (body: UserPayload) => {
    const response = await apiRequest.patch('/users', body)
    return response.data as Data<User>
}

export const useUpdateUser = () =>
    useMutation({
        mutationKey: ['users'],
        mutationFn: updateUser,
    })
