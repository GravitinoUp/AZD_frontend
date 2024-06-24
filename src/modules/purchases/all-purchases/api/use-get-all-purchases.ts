import { apiRequest } from '@/shared/api'
import { Data, Payload } from '@/types/fetch.ts'
import { Purchase, PurchaseSort } from '@/types/purchase'
import { useQuery } from '@tanstack/react-query'

const getAllPurchases = async (body: Payload<Purchase, PurchaseSort>) => {
    const response = await apiRequest.post('/purchase/all', body)
    return response.data as Data<Purchase[]>
}

export const useGetAllPurchases = (body: Payload<Purchase, PurchaseSort>) =>
    useQuery({
        queryKey: ['purchases', body],
        queryFn: () => getAllPurchases(body),
    })
