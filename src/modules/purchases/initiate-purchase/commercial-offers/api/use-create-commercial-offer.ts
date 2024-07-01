import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { CommercialOfferPayload } from '@/types/commercial-offer'
import { Result } from '@/types/fetch'
import { useMutation } from '@tanstack/react-query'

const createCommercialOffer = async (body: CommercialOfferPayload) => {
    const response = await apiRequest.post('/commercial-offer', body)
    return response.data as Result
}

export const useCreateCommercialOffer = () =>
    useMutation({
        mutationKey: [ApiKeys.CommercialOffers],
        mutationFn: createCommercialOffer,
    })
