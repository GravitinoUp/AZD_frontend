import { SortOptions } from './fetch'

export interface KTRU {
    ktru_uuid: string
}

export type KTRUSort = Partial<Record<keyof KTRU, SortOptions>>

export interface KBK {
    kbk_uuid: string
    kbk_name: KBKValue
    kbk_section: KBKValue
    kbk_subsection: KBKValue
    kbk_target_article: KBKValue
    kbk_expenses_type: KBKValue
}

export interface KBKSort {
    kbk_uuid: SortOptions
    kbk_name: KBKValueSort
    kbk_section: KBKValueSort
    kbk_subsection: KBKValueSort
    kbk_target_article: KBKValueSort
    kbk_expenses_type: KBKValueSort
}

export interface KBKValue {
    kbk_value_uuid: string
    kbk_type_id: string
    kbk_value: string
}

export type KBKValueSort = Partial<Record<keyof KBKValue, SortOptions>>

export interface OKPD {
    okpd_uuid: string
    okpd_code: string
    okpd_name: string
    okpd_data_json: string
}

export type OKPDSort = Partial<Record<keyof OKPD, SortOptions>>

export interface OKEI {
    okei_uuid: string
    okei_code: string
    okei_full_name: string
    okei_short_name: string
}

export type OKEISort = Partial<Record<keyof OKEI, SortOptions>>

export interface KOSGU {
    kosgu_uuid: string
    kosgu_code: string
}

export type KOSGUSort = Partial<Record<keyof KOSGU, SortOptions>>
