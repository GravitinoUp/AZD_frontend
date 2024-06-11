import { apiRequest } from '@/shared/api'
import { Data, Payload } from '@/types/fetch'
import { Role, RoleSort } from '@/types/user'
import { useQuery } from '@tanstack/react-query'

const getAllRoles = async (body: Payload<Role, RoleSort>) => {
    const response = await apiRequest.post('/roles/all', body)
    return response.data as Data<Role[]>
}

export const useGetAllRoles = (body: Payload<Role, RoleSort>) =>
    useQuery({
        queryKey: ['roles', body],
        queryFn: () => getAllRoles(body),
    })
