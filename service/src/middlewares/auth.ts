import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import { apiSecretKey } from "../config/env";
import logger from "../config/logger";
import APIError from "../utils/APIError";
import { handler } from "./error";

export const auth = function (req: Request, res: Response, next: NextFunction) {
    if (!req.headers.authorization || req.headers.authorization !== apiSecretKey) {
        return handler(new APIError({
            message: 'Unauthorized',
            status: httpStatus.UNAUTHORIZED
        }), req, res)
    }
    return next()
};

