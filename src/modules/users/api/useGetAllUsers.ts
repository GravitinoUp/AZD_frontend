import { apiRequest } from '@/shared/api'
import { Data } from '@/types/interface/fetch'
import { User } from '@/types/interface/user'
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
