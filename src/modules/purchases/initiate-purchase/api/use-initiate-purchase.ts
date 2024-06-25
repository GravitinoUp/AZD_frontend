import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Result } from '@/types/fetch'
import { Purchase, PurchasePayload } from '@/types/purchase'
import { useMutation } from '@tanstack/react-query'

const initiatePurchase = async (body: PurchasePayload) => {
    const response = await apiRequest.post('/purchase', body)
    return response.data as Result<Purchase>
}

export const useInitiatePurchase = () =>
    useMutation({
        mutationKey: [ApiKeys.Purchases],
        mutationFn: initiatePurchase,
    })
