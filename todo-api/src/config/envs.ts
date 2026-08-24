import dotenv from "dotenv";


dotenv.config();

export const envs = {
    PORT: process.env.PORT ?? '3000',
    POSTGRES_URL: process.env.POSTGRES_URL!, /*Le dice a TYpescript que confie que esa variable existe*/
    JWT_SECRET: process.env.JWT_SECRET!,
    JWT_EXPIRES_IN: process.env.JWT_EXPIRES_IN && '6h',
};