import { SortOptions } from './fetch'
import { Organization } from './organization'
import { User } from './user'

export interface Purchase {
    purchase_uuid: string
    purchase_name: string
    purchase_type: PurchaseType
    initiator: User
    executor: Organization | null
    purchase_identification_code: string | null
    contract_identification_code: string | null
    start_date: string | null
    end_application_date: string | null
    executor_date: string | null
    end_date: string
    start_max_price: number | null
    end_price: number | null
    currency_code: string
    currency: Currency
    purchase_step: PurchaseStep
    delivery_address: string
    is_organization_fund: boolean
    application_enforcement: number | null
    is_unilateral_refusal: boolean
    contract_enforcement: number | null
    quality_guarantee_period: number
    manufacturer_guarantee: number | null
    warranty_obligations_enforcement: number | null
    additional_info: string | null
}

export interface PurchasePayload {
    purchase_uuid?: string
    purchase_name: string
    purchase_type_id: number
    executor_uuid?: string
    purchase_identification_code?: string
    contract_identification_code?: string
    start_date?: string
    end_application_date?: string
    executor_date?: string
    end_date: string
    start_max_price?: number
    end_price?: number
    currency_code: string
    delivery_address: string
    is_organization_fund: boolean
    application_enforcement?: string
    is_unilateral_refusal: boolean
    contract_enforcement?: string
    quality_guarantee_period: number
    manufacturer_guarantee?: number
    warranty_obligations_enforcement?: string
    additional_info?: string
}

export interface PurchaseType {
    purchase_type_id: number
    purchase_type_name: string
}

export type PurchaseTypeSort = Partial<Record<keyof PurchaseType, SortOptions>>

export interface PurchaseStep {
    purchase_step_id: number
    purchase_step_name: string
}

export interface Currency {
    currency_code: string
    currency_name: string
}
