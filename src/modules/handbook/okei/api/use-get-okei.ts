import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data, Payload } from '@/types/fetch.ts'
import { OKEI, OKEISort } from '@/types/handbook'
import { useQuery } from '@tanstack/react-query'

const getAllOKEI = async (body: Payload<OKEI, OKEISort>) => {
    const response = await apiRequest.post('/okei/all', body)
    return response.data as Data<OKEI[]>
}

export const useGetAllOKEI = (body: Payload<OKEI, OKEISort>) =>
    useQuery({
        queryKey: [ApiKeys.OKEI, body],
        queryFn: () => getAllOKEI(body),
    })
