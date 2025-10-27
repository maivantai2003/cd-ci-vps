import express from 'express';
import { AppDataSource } from './data/data-source';
import cors from 'cors';
import userRouter from './routes/userRoutes';
import { errorHandler } from './middleware/errorHandler';
import authRoute from './routes/authRoutes';
const app = express();
const PORT = process.env.PORT || 3000;
app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/api/users",userRouter);
app.use("/api/auth",authRoute);
app.use(errorHandler)
console.log("Current environment:", process.env.NODE_ENV);

if (process.env.NODE_ENV === "production") {
  console.log("🚀 Running in production mode");
} else {
  console.log("🧑‍💻 Running in development mode");
}

AppDataSource.initialize().then(()=>{
    console.log("Data Source has been initialized!");
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch((error)=>{
    console.error("Error during Data Source initialization:", error);
});
