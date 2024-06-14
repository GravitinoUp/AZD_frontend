import { SortOptions } from './fetch'

export interface PurchaseType {
    purchase_type_id: number
    purchase_type_name: string
}

export type PurchaseTypeSort = Partial<Record<keyof PurchaseType, SortOptions>>
