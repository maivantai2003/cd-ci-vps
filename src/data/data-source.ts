import dotenv from "dotenv";
import { DataSource } from "typeorm";
dotenv.config();
export const AppDataSource=new DataSource({
    type: "postgres" ,
    host: process.env.DB_HOST,
    port: process.env.DB_PORT ? parseInt(process.env.DB_PORT) : 5432,
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    synchronize: false,
    logging: true,
    entities: [process.env.NODE_ENV==="production"?"dist/entities/**/*.js": "src/entities/**/*.ts"],
    migrations: [process.env.NODE_ENV==="production"?"dist/migrations/**/*.js": "src/migrations/**/*.ts"],
    // subscribers: ["src/subscriber/**/*.ts"],
});