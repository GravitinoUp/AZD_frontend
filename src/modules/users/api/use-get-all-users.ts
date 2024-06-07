import { apiRequest } from '@/shared/api'
import { Data } from '@/types/fetch.ts'
import { User } from '@/types/user.ts'
import { useQuery } from '@tanstack/react-query'

const getAllUsers = async () => {
    const response = await apiRequest.post('/users/all')
    return response.data as Data<User[]>
}

export const useGetAllUsers = () =>
    useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
    })
