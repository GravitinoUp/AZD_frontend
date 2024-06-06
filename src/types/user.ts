export interface User {
    user_uuid: string
    person_uuid: string
    role_id: number
    is_active: boolean
    email: string
    phone?: string
    password: string
}
