import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { Result } from '@/types/fetch'
import { Purchase, PurchasePayload } from '@/types/purchase'
import { useMutation } from '@tanstack/react-query'

const updatePurchase = async (body: Partial<PurchasePayload>) => {
    const response = await apiRequest.patch('/purchase', body)
    return response.data as Result<Purchase>
}

export const useUpdatePurchase = () =>
    useMutation({
        mutationKey: [ApiKeys.Purchases],
        mutationFn: updatePurchase,
    })
