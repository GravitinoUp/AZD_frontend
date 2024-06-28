import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data, Payload } from '@/types/fetch.ts'
import { KBK, KBKSort } from '@/types/handbook'
import { useQuery } from '@tanstack/react-query'

const getAllKBK = async (body: Payload<KBK, Partial<KBKSort>>) => {
    const response = await apiRequest.post('/kbk/all', body)
    return response.data as Data<KBK[]>
}

export const useGetAllKBK = (body: Payload<KBK, Partial<KBKSort>>) =>
    useQuery({
        queryKey: [ApiKeys.KBK, body],
        queryFn: () => getAllKBK(body),
    })
