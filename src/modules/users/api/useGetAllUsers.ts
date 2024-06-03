import { apiRequest } from '@/shared/api'
import { DataInterface } from '@/types/interface/fetch'
import { UserInterface } from '@/types/interface/user'
import { useQuery } from '@tanstack/react-query'

const getAllUsers = async () => {
    const response = await apiRequest.post('/users/all')
    return response.data as DataInterface<UserInterface[]>
}

export const useGetAllUsers = () =>
    useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
    })
