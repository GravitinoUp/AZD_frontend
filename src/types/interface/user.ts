export interface User {
    user_uuid: string
    is_active: boolean
    email: string
    phone: string | null
    role: Role
    person: Person
}

export interface UserPayload {
    user_uuid?: string
    last_name: string
    first_name: string
    patronymic?: string
    post: string
    legal_basis_uuid?: string
    email: string
    phone?: string
    password: string
}

export interface Person {
    person_uuid: string
    last_name: string
    first_name: string
    patronymic: string | null
    post: string
    legal_basis?: LegalBasis | null
}

export interface Role {
    role_id: number
    role_name: string
}

export interface LegalBasis {
    legal_basis_uuid: string
    legal_basis_name: string
    legal_basis_number: string
    legal_basis_date: Date
}
