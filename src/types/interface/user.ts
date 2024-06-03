import { SortOptionsType } from './fetch'

export interface UserInterface {
    user_uuid: string
    is_active: boolean
    email: string
    phone: string | null
    role: RoleInterface
    person: PersonInterface
}

export interface PersonInterface {
    person_uuid: string
    last_name: string
    first_name: string
    patronymic: string | null
    post: string
    legal_basis?: LegalBasisInterface | null
}

export interface RoleInterface {
    role_id: number
    role_name: string
}

export type RoleSortInterface = Partial<Record<keyof RoleInterface, SortOptionsType>>

export interface LegalBasisInterface {
    legal_basis_uuid: string
    legal_basis_name: string
    legal_basis_number: string
    legal_basis_date: Date
}
