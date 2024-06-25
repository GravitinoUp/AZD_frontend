import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data } from '@/types/fetch'
import { User, UserPayload } from '@/types/user'
import { useMutation } from '@tanstack/react-query'

const updateUser = async (body: UserPayload) => {
    const response = await apiRequest.patch('/users', body)
    return response.data as Data<User>
}

export const useUpdateUser = () =>
    useMutation({
        mutationKey: [ApiKeys.Users],
        mutationFn: updateUser,
    })
