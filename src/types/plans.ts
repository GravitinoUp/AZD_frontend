import { Branch } from '@/types/branch.ts'
import { SortOptions } from '@/types/fetch.ts'
import { User } from '@/types/user.ts'

interface Way {
    way_id: number
    way_name: string
}

export interface Plan {
    created_at: string
    updated_at: string
    plan_uuid: string
    purchase_name?: string | null
    purchase_price?: number | null
    purchase_date?: string | null
    purchase_uuid?: string | null
    kosgu: string
    user_uuid: string
    user: User
    purchase_offer_number?: string | null
    okpd_code: string
    object_name: string
    okei_code: string
    result_name: string
    npa_date: string
    npa_number: string
    current_year_plan_count: number
    current_year_plan_avg_price: number
    first_year_plan_count: number
    first_year_plan_avg_price: number
    second_year_plan_count: number
    second_year_plan_avg_price: number
    next_years_plan_count: number
    next_years_plan_avg_price: number
    current_year_limit: number
    first_year_limit: number
    second_year_limit: number
    next_years_limit: number
    start_max_price: number
    public_purchase_discussion: boolean
    authorized_institution?: string | null
    organizer_name?: string | null
    placement_month: string
    way_id: number
    way: Way
    small_business: boolean
    initiator: string
    branch_uuid: string
    branch: Branch
    price_value?: number | null
    savings?: number | null
    contract_number?: string | null
    contract_date?: string | null
    contragent?: string | null
    approval_letter: string
}

export type PlanSort = Partial<Record<keyof Plan, SortOptions>>
