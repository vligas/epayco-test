import express from 'express';
import morgan from 'morgan';
import bodyParser from 'body-parser';
import compress from 'compression';
import methodOverride from 'method-override';
import cors from 'cors';
import helmet from 'helmet';
import qs from 'qs';
import { logs } from './env';
import { converter, handler, notFound } from '../middlewares/error';
import logger from './logger';
import { wrap } from '../utils/asyncWrap';
import routes from '../api/features/v1';

/**
 * Express instance
 * @public
 */
const app = express();
app.set('query parser', (str: string) =>
    qs.parse(str, { strictNullHandling: true }),
);

// request logging. dev: console | production: file
app.use(morgan(logs));

// parse body params and attache them to req.body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// gzip compression
app.use(compress());

// lets you use HTTP verbs such as PUT or DELETE
// in places where the client doesn't support it
app.use(methodOverride());

// secure apps by setting various HTTP headers
app.use(helmet());

// enable CORS - Cross Origin Resource Sharing
app.use(cors());
app.use('*', cors());

// format reponse to have this shape: { data: ... }
// app.use(format)
app.use('/v1', routes)

// if error is not an instanceOf APIError, convert it.
app.use(converter);

// catch 404 and forward to error handler
app.use(notFound);

// error handler, send stacktrace only during development
app.use(handler);

export default app;
