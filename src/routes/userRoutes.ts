import { Router, Request, Response, NextFunction } from "express";
import { UserController } from "../controllers/UserController";
import { UserService } from "../services/UserService";
import { UserRepository } from "../repositories/userRepository";
import { authMiddleware } from "../middleware/authMiddleware";

const userRouter = Router();
const userRepo=new UserRepository();
const userService=new UserService(userRepo);
const userController = new UserController(userService);
userRouter.use(authMiddleware);
userRouter.get("/", (req: Request, res: Response, next: NextFunction) =>
  userController.getAllUsers(req, res)
);
userRouter.get("/:id", (req: Request, res: Response, next: NextFunction) =>
  userController.getUserById(req, res)
);
userRouter.post("/", (req: Request, res: Response, next: NextFunction) =>
  userController.createUser(req, res)
);
export default userRouter;
