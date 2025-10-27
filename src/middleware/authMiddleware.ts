import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();
export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({ message: "Unauthorized: No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) return res.status(401).json({ message: "Missing token" });
    try {
        const payload = jwt.verify(token, process.env.JWT_ACCESS_SECRET!);
        (req as any).user = payload;
        next();
    } catch {
        return res.status(401).json({ message: "Invalid or expired token" });
    }
}