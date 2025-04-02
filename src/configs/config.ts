import dotenv from 'dotenv';

dotenv.config();

interface Config {
    port: number;
    nodeEnv: string;
}

export const AppConfig: Config = {
    port: Number(process.env.PORT) || 9090,
    nodeEnv: process.env.NODE_ENV || 'DEVELOPMENT',
};

