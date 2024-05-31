import { apiRequest } from '@/shared/api'
import { useQuery } from '@tanstack/react-query'

const getAllUsers = async () => {
    const response = await apiRequest.get('/users')
    return response.data
}

export const useGetAllUsers = () =>
    useQuery({
        queryKey: ['users'],
        queryFn: getAllUsers,
    })
