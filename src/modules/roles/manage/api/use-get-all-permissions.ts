import { apiRequest } from '@/shared/api'
import { Data } from '@/types/fetch'
import { Permission } from '@/types/permission'
import { useQuery } from '@tanstack/react-query'

const getAllPermissions = async () => {
    const response = await apiRequest.get('/permission/all')
    return response.data as Data<Permission[]>
}

export const useGetAllPermissions = () =>
    useQuery({
        queryKey: ['permissions'],
        queryFn: getAllPermissions,
        select: (result) => result.data,
    })
