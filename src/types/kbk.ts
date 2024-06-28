export interface KBK {
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

export enum KBKTypeCodes {
    SECTION = 1,
    SUBSECTION,
    TARGET_ARTICLE,
    EXPENSES_TYPE,
}

export interface KbkTypeData {
    created_at: string
    updated_at: string
    kbk_value_uuid: string
    kbk_type_id: number
    kbk_value: string
    kbk_type: {
        created_at: string
        updated_at: string
        kbk_type_id: number
        kbk_type_name: string
    }
}
