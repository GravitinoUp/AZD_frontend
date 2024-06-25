import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data } from '@/types/fetch'
import { Permission } from '@/types/permission'
import { useQuery } from '@tanstack/react-query'

const getAllPermissions = async () => {
    const response = await apiRequest.get('/permission/all')
    return response.data as Data<Permission[]>
}

export const useGetAllPermissions = () =>
    useQuery({
        queryKey: [ApiKeys.Permissions],
        queryFn: getAllPermissions,
        select: (result) => result.data,
    })
