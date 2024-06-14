import { apiRequest } from '@/shared/api'
import { Branch, BranchSort } from '@/types/branch'
import { Data, Payload } from '@/types/fetch.ts'
import { useQuery } from '@tanstack/react-query'

const getAllBranches = async (body: Payload<Branch, BranchSort>) => {
    const response = await apiRequest.post('/branch/all', body)
    return response.data as Data<Branch[]>
}

export const useGetAllBranches = (body: Payload<Branch, BranchSort>) =>
    useQuery({
        queryKey: ['branches', body],
        queryFn: () => getAllBranches(body),
    })
