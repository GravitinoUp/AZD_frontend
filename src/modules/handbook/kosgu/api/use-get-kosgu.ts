import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data, Payload } from '@/types/fetch.ts'
import { KOSGU, KOSGUSort } from '@/types/handbook'
import { useQuery } from '@tanstack/react-query'

const getAllKOSGU = async (body: Payload<KOSGU, KOSGUSort>) => {
    const response = await apiRequest.post('/kosgu/all', body)
    return response.data as Data<KOSGU[]>
}

export const useGetAllKOSGU = (body: Payload<KOSGU, KOSGUSort>) =>
    useQuery({
        queryKey: [ApiKeys.KOSGU, body],
        queryFn: () => getAllKOSGU(body),
    })
