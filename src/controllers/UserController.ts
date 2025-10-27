import { NextFunction,Response,Request } from 'express';
import { UserService } from './../services/UserService';
export class UserController{
    constructor(private readonly userService:UserService){}
    async getAllUsers(req:Request,res:Response){
        console.log("🔥 Path:", req.path);
        const users=await this.userService.getAllUser();
        res.json(users);
    }
    async getUserById(req:Request,res:Response){
        const user=await this.userService.getUserById(req.params.id);
        const temp=(req as any).user;
        console.log("🔥 Authenticated User Info:", temp);
        res.json(user);
    }
    async createUser(req:Request,res:Response){
        const newUser=await this.userService.createUser(req.body);
        res.json(newUser);
    }
}