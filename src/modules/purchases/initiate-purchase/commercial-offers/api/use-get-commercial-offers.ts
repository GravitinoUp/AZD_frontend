import { apiRequest } from '@/shared/api'
import { ApiKeys } from '@/shared/api/keys'
import { CommercialOffer } from '@/types/commercial-offer'
import { Data } from '@/types/fetch'
import { useQuery } from '@tanstack/react-query'

const getCommercialOffers = async (purchase_uuid?: string) => {
    const response = await apiRequest.get(`/commercial-offer/purchase/${purchase_uuid}`)
    return response.data as Data<CommercialOffer[]>
}

export const useGetCommercialOffers = (purchase_uuid?: string) =>
    useQuery({
        queryKey: [ApiKeys.CommercialOffers, purchase_uuid],
        queryFn: () => getCommercialOffers(purchase_uuid),
        select: (data) => data.data,
        enabled: purchase_uuid !== undefined,
    })
