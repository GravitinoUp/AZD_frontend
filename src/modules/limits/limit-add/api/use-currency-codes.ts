import { apiRequest } from '@/shared/api'
import { CurrencyCode, CurrencyCodeSort } from '@/types/common.ts'
import { Data, Payload } from '@/types/fetch.ts'
import { useQuery } from '@tanstack/react-query'

const getCurrencyCodes = async (body: Payload<CurrencyCode, CurrencyCodeSort>) => {
    const response = await apiRequest.post('/currency/all', body)
    return response.data as Data<CurrencyCode[]>
}

export const useCurrencyCodes = (body: Payload<CurrencyCode, CurrencyCodeSort>) =>
    useQuery({
        queryKey: ['currency-codes', body],
        queryFn: () => getCurrencyCodes(body),
    })
