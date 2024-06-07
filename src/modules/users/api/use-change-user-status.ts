import { apiRequest } from '@/shared/api'
import { Result } from '@/types/fetch.ts'
import { User, UserStatusPayload } from '@/types/user.ts'
import { useMutation, useQueryClient } from '@tanstack/react-query'

const changeUserStatus = async (body: UserStatusPayload) => {
    const response = await apiRequest.patch('/users/status', body)
    return response.data as Result<User>
}

export const useChangeUserStatus = () => {
    const queryClient = useQueryClient()

    return useMutation({
        mutationKey: ['users'],
        mutationFn: changeUserStatus,
        onSuccess: () => queryClient.invalidateQueries({ queryKey: ['users'] }),
    })
}
