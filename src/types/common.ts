import { SortOptions } from '@/types/fetch.ts'

export interface Route {
    route: string
    label: string
}

export interface CurrencyCode {
    currency_code: string
    currency_name: string
}

export type CurrencyCodeSort = Partial<Record<keyof CurrencyCode, SortOptions>>
