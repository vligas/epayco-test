import "reflect-metadata";
import logger from './config/logger';
import app from './config/express';
import { port, env } from './config/env';

// listen to requests
app.listen(port, () => logger.info(`server started on port ${port} (${env})`));