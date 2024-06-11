import { apiRequest } from '@/shared/api'
import { Data, Payload } from '@/types/fetch.ts'
import { User, UserSort } from '@/types/user.ts'
import { useQuery } from '@tanstack/react-query'

const getAllUsers = async (body: Payload<User, UserSort>) => {
    const response = await apiRequest.post('/users/all', body)
    return response.data as Data<User[]>
}

export const useGetAllUsers = (body: Payload<User, UserSort>) =>
    useQuery({
        queryKey: ['users', body],
        queryFn: () => getAllUsers(body),
    })
