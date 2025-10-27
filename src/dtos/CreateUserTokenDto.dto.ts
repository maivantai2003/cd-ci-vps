export interface CreateUserTokenDto {
    userId:string,
    refreshToken:string,
    expiresAt:Date
}