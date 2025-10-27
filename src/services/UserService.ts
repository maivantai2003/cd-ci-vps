import { CreateUserDto } from "../dtos/CreateUserDto.dto";
import { User } from "../entities/user";
import { UserRepository } from "../repositories/userRepository";
import bcrypt from 'bcrypt';
export class UserService {
    constructor(private readonly userRepository: UserRepository) {}
    async getAllUser(): Promise<User[]> {
        return this.userRepository.findAll();
    }
    async getUserById(id: string): Promise<User | null> {
        return this.userRepository.findById(id);
    }
    async getUserByEmail(email: string): Promise<User | null> {
        return this.userRepository.findByEmail(email);
    }
    async createUser(data: Partial<CreateUserDto>): Promise<User> {
        return this.userRepository.createUser({
            name:data.name!,
            email:data.email!,
            password:await bcrypt.hash(data.password!,10)
        });
    }
    async updateUser(id: string, data: Partial<User>): Promise<User | null> {
        return this.userRepository.updateUser(id, data);
    }
    async deleteUser(id: string): Promise<boolean> {
        return this.userRepository.deleteUser(id);
    }
}