import { Organization } from './organization'
import { Purchase } from './purchase'

export interface CommercialOffer {
    commercial_offer_uuid: string
    commercial_offer_text: string
    purchase: Purchase
    organization: Organization
    sum: number
}

export interface CommercialOfferPayload {
    purchase_uuid: string
    commercial_offer_text: string
    organizations: string[]
}
