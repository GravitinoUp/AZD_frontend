interface KBK {
    kbk_uuid: string
    kbk_name: string
    kbk_section_uuid: string
    kbk_section?: {
        kbk_value_uuid: string
        kbk_type: string
        kbk_value: string
    }
    kbk_subsection_uuid: string
    kbk_subsection?: {
        kbk_value_uuid: string
        kbk_type: string
        kbk_value: string
    }
    kbk_target_article_uuid: string
    kbk_target_article?: {
        kbk_value_uuid: string
        kbk_type: string
        kbk_value: string
    }
    kbk_expenses_type_uuid: string
    kbk_expenses_type?: {
        kbk_value_uuid: string
        kbk_type: string
        kbk_value: string
    }
}

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
