// import jwt, { Secret } from "jsonwebtoken";
// import dotenv from "dotenv";

// dotenv.config();

// const accessSecret: Secret = process.env.JWT_ACCESS_SECRET as string;
// const refreshSecret: Secret = process.env.JWT_REFRESH_SECRET as string;

// interface JwtPayload {
//   userId: string;
//   email: string;
// }

// export const JwtHelper = {
//   generateAccessToken(payload: JwtPayload) {
//     return jwt.sign(payload, accessSecret, {
//       expiresIn: process.env.ACCESS_TOKEN_EXPIRES_IN || "15m",
//     });
//   },
//   generateRefreshToken(payload: JwtPayload) {
//     return jwt.sign(payload, refreshSecret, {
//       expiresIn: process.env.REFRESH_TOKEN_EXPIRES_IN || "7d",
//     });
//   },
//   verifyAccessToken(token: string) {
//     return jwt.verify(token, accessSecret) as JwtPayload;
//   },
//   verifyRefreshToken(token: string) {
//     return jwt.verify(token, refreshSecret) as JwtPayload;
//   },
// };
