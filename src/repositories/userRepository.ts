import { DeleteResult } from 'typeorm';
import { AppDataSource } from '../data/data-source';
import { User } from './../entities/user';
export class UserRepository {
    private readonly repo=AppDataSource.getRepository(User);
    async findAll(): Promise<User[]> {
        return this.repo.find();
    }
    async findById(id: string): Promise<User | null> {
        return this.repo.findOneBy({id});
    }
    async findByEmail(email: string): Promise<User | null> {
        return this.repo.findOneBy({email});
    }
    async createUser(userData: Partial<User>): Promise<User> {
        const user = this.repo.create(userData);
        return this.repo.save(user);
    }
    async updateUser(id: string, updateData: Partial<User>): Promise<User | null> {
        const user = await this.repo.findOneBy({id});
        if (!user) {
            return null;
        }
        this.repo.merge(user, updateData);
        return this.repo.save(user);
    }
    async deleteUser(id: string): Promise<boolean> {
        const result:DeleteResult = await this.repo.delete(id);
        return result.affected !== 0;
    }
}