export interface AuthPayload {
    email: string
    password: string
}

export interface JWT {
    refreshToken: string
    accessToken: string
}

export interface RefreshPayload {
    refresh_token: string
}
