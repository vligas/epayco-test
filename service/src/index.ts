import "reflect-metadata";
import logger from './config/logger';
import app from './config/express';
import { port, env } from './config/env';
import { connect } from "./config/db";

// listen to requests
connect().then(() => {
    app.listen(port, () => logger.info(`server started on port ${port} (${env})`));
})
    .catch(err => {
        logger.error(err)
    })
