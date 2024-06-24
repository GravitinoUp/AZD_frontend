import { apiRequest } from '@/shared/api'
import { Result } from '@/types/fetch'
import { Purchase, PurchasePayload } from '@/types/purchase'
import { useMutation } from '@tanstack/react-query'

const initiatePurchase = async (body: PurchasePayload) => {
    const response = await apiRequest.post('/purchase', body)
    return response.data as Result<Purchase>
}

export const useInitiatePurchase = () =>
    useMutation({
        mutationKey: ['purchases'],
        mutationFn: initiatePurchase,
    })
