import { UserService } from './../services/UserService';
import { Router } from "express";
import { UserRepository } from "../repositories/userRepository";
import { UserRefreshTokenRepository } from "../repositories/userRefreshTokenRepository";
import { UserRefreshTokenService } from '../services/UserRefreshToken';
import { UserRefreshTokenController } from '../controllers/UserRefreshToken';

const authRoute=Router();
const userRepo=new UserRepository();
const authRepo=new UserRefreshTokenRepository();
const userRefreshTokenService=new UserRefreshTokenService(authRepo,userRepo);
const userRefreshTokenController=new UserRefreshTokenController(userRefreshTokenService);
authRoute.post('/login',(req,res)=>{
    userRefreshTokenController.login(req,res);
});
authRoute.post('/refresh-token',(req,res)=>{
    userRefreshTokenController.refreshToken(req,res);
});
export default authRoute;