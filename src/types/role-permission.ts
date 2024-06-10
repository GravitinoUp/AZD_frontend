export interface RolePermission {
    role_permission_id: number
    role_id: number | null
    user_uuid: string | null
    permission_id: string
    rights: boolean
}

export interface RolePermissionPayload {
    role_id?: number
    user_uuid?: number
    permission_ids: number[]
    rights: boolean
}
