import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Data, Payload } from '@/types/fetch'
import { PurchaseType, PurchaseTypeSort } from '@/types/purchase'
import { useQuery } from '@tanstack/react-query'

const getAllPurchaseTypes = async (body: Payload<PurchaseType, PurchaseTypeSort>) => {
    const response = await apiRequest.post('/purchase-type/all', body)
    return response.data as Data<PurchaseType[]>
}

export const useGetAllPurchaseTypes = (body: Payload<PurchaseType, PurchaseTypeSort>) =>
    useQuery({
        queryKey: [ApiKeys.PurchaseTypes, body],
        queryFn: () => getAllPurchaseTypes(body),
        select: (data) => data.data,
    })
