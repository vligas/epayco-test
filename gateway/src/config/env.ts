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
    logs,
    serviceUrl,
    apiSecretKey
} = {
    env: process.env.NODE_ENV,
    port: process.env.APP_PORT,
    serviceUrl: process.env.SERVICE_URL,
    apiSecretKey: process.env.API_SECRET_KEY,
    logs: process.env.NODE_ENV === 'production' ? 'combined' : 'dev',
};
