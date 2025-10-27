import { AppDataSource } from "../data/data-source";
import { CreateUserTokenDto } from "../dtos/CreateUserTokenDto.dto";
import { User } from "../entities/user";
import { UserRefreshToken } from "../entities/user_refresh_token";

export class UserRefreshTokenRepository {
    private readonly repo = AppDataSource.getRepository(UserRefreshToken);
    async createToken(tokenData: Partial<CreateUserTokenDto>): Promise<UserRefreshToken> {
        const token = this.repo.create({
        refreshToken: tokenData.refreshToken!,
        expiresAt: tokenData.expiresAt!,
        user: { id: tokenData.userId } as User,
        });

        return await this.repo.save(token);
    }
    async findByToken(refreshToken: string): Promise<UserRefreshToken | null> {
        return this.repo.findOne({
            where: { refreshToken },
            relations: ["user"],
        });
    }
    async deleteToken(refreshToken:string): Promise<boolean> {
       var result= await this.repo.delete({refreshToken}); 
       return result.affected !== 0;
    }
}