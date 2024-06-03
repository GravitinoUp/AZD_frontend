import { apiRequest } from '@/shared/api'
import { DataInterface, PayloadInterface } from '@/types/interface/fetch'
import { RoleInterface, RoleSortInterface } from '@/types/interface/user'
import { useQuery } from '@tanstack/react-query'

const getAllRoles = async (body: PayloadInterface<RoleInterface, RoleSortInterface>) => {
    const response = await apiRequest.post('/roles/all', body)
    return response.data as DataInterface<RoleInterface[]>
}

export const useGetAllRoles = (body: PayloadInterface<RoleInterface, RoleSortInterface>) =>
    useQuery({
        queryKey: ['roles', body],
        queryFn: () => getAllRoles(body),
    })
