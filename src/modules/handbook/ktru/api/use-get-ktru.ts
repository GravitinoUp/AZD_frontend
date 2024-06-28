import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data, Payload } from '@/types/fetch.ts'
import { KTRU, KTRUSort } from '@/types/handbook'
import { useQuery } from '@tanstack/react-query'

const getAllKTRU = async (body: Payload<KTRU, KTRUSort>) => {
    const response = await apiRequest.post('/', body)
    return response.data as Data<KTRU[]>
}

export const useGetAllKTRU = (body: Payload<KTRU, KTRUSort>) =>
    useQuery({
        queryKey: [ApiKeys.OKPD, body],
        queryFn: () => getAllKTRU(body),
    })
