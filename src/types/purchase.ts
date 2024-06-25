import { SortOptions } from './fetch'
import { Organization, OrganizationSort } from './organization'
import { User, UserSort } from './user'

export interface Purchase {
    purchase_uuid: string
    purchase_name: string | null
    purchase_type: PurchaseType | null
    initiator: User | null
    executor: Organization | null
    purchase_identification_code: string | null
    contract_identification_code: string | null
    start_date: string | null
    end_application_date: string | null
    executor_date: string | null
    end_date: string | null
    start_max_price: number | null
    end_price: number | null
    currency_code: string | null
    currency: Currency | null
    purchase_step: PurchaseStep | null
    delivery_address: string | null
    is_organization_fund: boolean | null
    application_enforcement: string | null
    is_unilateral_refusal: boolean | null
    contract_enforcement: string | null
    quality_guarantee_period: number | null
    manufacturer_guarantee: number | null
    warranty_obligations_enforcement: string | null
    additional_info: string | null
}

export interface PurchaseSort {
    purchase_uuid?: SortOptions
    purchase_name?: SortOptions
    purchase_type?: PurchaseTypeSort
    initiator?: UserSort
    executor?: OrganizationSort
    purchase_identification_code?: SortOptions
    contract_identification_code?: SortOptions
    start_date?: SortOptions
    end_application_date?: SortOptions
    executor_date?: SortOptions
    end_date?: SortOptions
    start_max_price?: SortOptions
    end_price?: SortOptions
    currency_code?: SortOptions
    currency?: CurrencySort
    purchase_step?: PurchaseStepSort
    delivery_address?: SortOptions
    is_organization_fund?: SortOptions
    application_enforcement?: SortOptions
    is_unilateral_refusal?: SortOptions
    contract_enforcement?: SortOptions
    quality_guarantee_period?: SortOptions
    manufacturer_guarantee?: SortOptions
    warranty_obligations_enforcement?: SortOptions
    additional_info?: SortOptions
}

export interface PurchasePayload {
    purchase_uuid?: string
    purchase_name?: string
    purchase_type_id?: number
    executor_uuid?: string
    purchase_identification_code?: string
    contract_identification_code?: string
    start_date?: string
    end_application_date?: string
    executor_date?: string
    end_date?: string
    start_max_price?: number
    end_price?: number
    currency_code?: string
    delivery_address?: string
    is_organization_fund?: boolean
    application_enforcement?: string
    is_unilateral_refusal?: boolean
    contract_enforcement?: string
    quality_guarantee_period?: number
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
export type PurchaseStepSort = Partial<Record<keyof PurchaseStep, SortOptions>>

export interface Currency {
    currency_code: string
    currency_name: string
}
export type CurrencySort = Partial<Record<keyof Currency, SortOptions>>
