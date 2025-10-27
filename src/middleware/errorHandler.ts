import { NextFunction, Request, Response } from "express";

interface AppError extends Error {
  statusCode?: number;
  details?: any;
}
export const errorHandler = (err:AppError,req:Request,res:Response,next:NextFunction)=>{
    console.error("❌ Error caught by middleware:", err);

  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";

  res.status(statusCode).json({
    success: false,
    message,
    details: err.details || null,
  });
}