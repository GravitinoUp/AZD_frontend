import { KBK } from '@/types/kbk.ts'

interface Kosgu {
    kosgu_uuid: string
    kosgu_code: string
    kosgu_name: string
}

interface LimitStatus {
    limit_status_id: number
    limit_status_name: string
}

export interface Limit {
    created_at: string
    updated_at: string
    limit_uuid: string
    limit_name: string
    line_code: string
    kbk_uuid: string
    kbk?: KBK
    kosgu_uuid: string
    kosgu?: Kosgu
    limit_version?: number
    limit_status_id: number
    limit_status?: LimitStatus
    current_year_rub_value: number
    current_year_currency_value?: number
    current_year_currency_code?: string
    first_year_rub_value: number
    first_year_currency_value?: number
    first_year_currency_code?: string
    second_year_rub_value: number
    second_year_currency_value?: number
    second_year_currency_code?: string
}

export interface NewLimitBody {
    limit_name: string
    line_code: string
    kbk_values: {
        kbk_name: string
        kbk_section: string
        kbk_subsection: string
        kbk_target_article: string
        kbk_expenses_type: string
    }
    kosgu_code: string
    years: Array<{
        limit_value_year: number
        rub_value: number
        currency_value?: number
        currency_code?: string
    }>
    branch_uuid: string
}
