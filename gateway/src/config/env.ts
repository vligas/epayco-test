import path from 'path';
import envLoad from 'dotenv-safe';

// import .env variables
envLoad.config({
    path: path.join(__dirname, '../../.env'),
    sample: path.join(__dirname, '../../.env.example'),
});

export const {
    env,
    port,
    db,
    logs,
} = {
    env: process.env.NODE_ENV,
    port: process.env.APP_PORT,
    db: {
        name: process.env.DB_NAME,
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
    },
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
