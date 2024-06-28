import { SortOptions } from './fetch'
import { RolePermission } from './role-permission'

export interface User {
    user_uuid: string
    is_active: boolean
    email: string
    phone: string | null
    role: Role
    person: Person
}

export type UserSort = Partial<Record<keyof User, SortOptions>>

export interface UserPayload {
    user_uuid?: string
    last_name: string
    first_name: string
    patronymic?: string
    post?: string
    legal_basis_uuid?: string
    email: string
    phone?: string
    password: string
    property_values?: string[]
}

export interface UserStatusPayload {
    user_uuid: string
    is_active: boolean
}

export interface Person {
    person_uuid: string
    last_name: string
    first_name: string
    patronymic: string | null
    post: string
    legal_basis?: LegalBasis | null
}

export type PersonSort = Partial<Record<keyof Person, SortOptions>>

export interface Role {
    role_id: number
    role_name: string
    role_permissions: RolePermission[]
}

export interface RolePayload {
    role_id: number
    role_name: string
    permission_ids: string[]
    property_values?: string[]
}

export type RoleSort = Partial<Record<keyof Role, SortOptions>>

export interface LegalBasis {
    legal_basis_uuid: string
    legal_basis_name: string
    legal_basis_number: string
    legal_basis_date: Date
}
