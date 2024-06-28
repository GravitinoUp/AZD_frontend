import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data, Payload } from '@/types/fetch.ts'
import { OKPD, OKPDSort } from '@/types/handbook'
import { useQuery } from '@tanstack/react-query'

const getAllOKPD = async (body: Payload<OKPD, OKPDSort>) => {
    const response = await apiRequest.post('/okpd/all', body)
    return response.data as Data<OKPD[]>
}

export const useGetAllOKPD = (body: Payload<OKPD, OKPDSort>) =>
    useQuery({
        queryKey: [ApiKeys.OKPD, body],
        queryFn: () => getAllOKPD(body),
    })
