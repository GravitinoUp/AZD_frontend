import { apiRequest } from '@/shared/api'
import { Result } from '@/types/fetch'
import { Purchase, PurchasePayload } from '@/types/purchase'
import { useMutation } from '@tanstack/react-query'

const updatePurchase = async (body: PurchasePayload) => {
    const response = await apiRequest.patch('/purchase', body)
    return response.data as Result<Purchase>
}

export const useUpdatePurchase = () =>
    useMutation({
        mutationKey: ['purchases'],
        mutationFn: updatePurchase,
    })
