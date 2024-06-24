import { apiRequest } from '@/shared/api'
import { Data, Payload } from '@/types/fetch'
import { PurchaseType, PurchaseTypeSort } from '@/types/purchase'
import { useQuery } from '@tanstack/react-query'

const getAllPurchaseTypes = async (body: Payload<PurchaseType, PurchaseTypeSort>) => {
    const response = await apiRequest.post('/purchase-type/all', body)
    return response.data as Data<PurchaseType[]>
}

export const useGetAllPurchaseTypes = (body: Payload<PurchaseType, PurchaseTypeSort>) =>
    useQuery({
        queryKey: ['purchase-types', body],
        queryFn: () => getAllPurchaseTypes(body),
        select: (data) => data.data,
    })
