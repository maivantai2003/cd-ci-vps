import { UserLoginDto } from './../dtos/UserLoginDto.dto';
import { UserRefreshTokenRepository } from "../repositories/userRefreshTokenRepository";
import { UserRefreshToken } from '../entities/user_refresh_token';
import jwt, { Secret } from "jsonwebtoken";
import { UserRepository } from '../repositories/userRepository';
import bcrypt from 'bcrypt';
import { AuthResponse } from '../dtos/AuthResponse';
export class UserRefreshTokenService {
    constructor(private readonly userRefreshTokenRepository: UserRefreshTokenRepository,private readonly userRepository:UserRepository) { }
    async login(UserLoginDto:UserLoginDto):Promise<AuthResponse | null>{
        var user=await this.userRepository.findByEmail(UserLoginDto.email);
        if (!user) throw new Error("Invalid credentials");
        const isMatch=await bcrypt.compare(UserLoginDto.password,user.password);
        if(!isMatch) throw new Error("Invalid credentials");
        const accessToken=jwt.sign({userId:user.id,role:user.email},process.env.JWT_ACCESS_SECRET!,{expiresIn:'15m'})
        const refreshToken=jwt.sign({userId:user.id},process.env.JWT_REFRESH_SECRET!,{expiresIn:'7d'})
        const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        var result= this.userRefreshTokenRepository.createToken({
            refreshToken,
            expiresAt,
            userId:user.id
        });
        if(!result) throw new Error("Could not create refresh token");
        return {
            accessToken,
            refreshToken
        };
    }
    async refreshToken(oldRefreshToken:string):Promise<AuthResponse | null>{
        const existingToken=await this.userRefreshTokenRepository.findByToken(oldRefreshToken);
        if(!existingToken) throw new Error("Invalid refresh token");
        const user=existingToken.user;
        const accessToken=jwt.sign({userId:user.id,email:user.email},process.env.JWT_ACCESS_SECRET!,{expiresIn:'15m'});
        const refreshToken=jwt.sign({userId:user.id,email:user.email},process.env.JWT_REFRESH_SECRET!,{expiresIn:'7d'});
        const newExpiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000);
        await this.userRefreshTokenRepository.deleteToken(refreshToken);
        await this.userRefreshTokenRepository.createToken({
        refreshToken: refreshToken  ,
        expiresAt: newExpiresAt,
        userId: user.id,
        });
        return { accessToken: accessToken, refreshToken: refreshToken };
    }
}