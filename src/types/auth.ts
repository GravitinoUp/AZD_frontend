export interface AuthPayload {
    email: string
    password: string
}

export interface JWT {
    refresh_token: string
    access_token: string
}

export interface RefreshPayload {
    refresh_token: string
}
