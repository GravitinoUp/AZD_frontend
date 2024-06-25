import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { useMutation } from '@tanstack/react-query'

const getStartMaxPrice = async (data: { prices: number[]; formula: 'min' | 'avg' }) => {
    const response = await apiRequest.get(
        `/purchase/get/start-max-price?${data.prices.map((value) => `prices=${value}&`)}formula=${data.formula}`
    )
    return response.data as number
}

export const useGetStartMaxPrice = () =>
    useMutation({
        mutationKey: [ApiKeys.Purchases],
        mutationFn: getStartMaxPrice,
    })
