import { UserLoginDto } from "../dtos/UserLoginDto.dto";
import { UserRefreshTokenService } from "../services/UserRefreshToken";
import { Response,Request } from 'express';
export class UserRefreshTokenController{
    constructor(private readonly userRefreshTokenService:UserRefreshTokenService){}
    async login(req:Request,res:Response){
        const user:UserLoginDto = req.body;
        const tokens = await this.userRefreshTokenService.login(user);
        res.json(tokens);
    }
    async refreshToken(req:Request,res:Response){
        const { refreshToken } = req.body;
        const tokens = await this.userRefreshTokenService.refreshToken(refreshToken);
        res.json(tokens);
    }
}