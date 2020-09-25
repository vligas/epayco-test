import { plainToClass } from "class-transformer";
import { validate } from "class-validator";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";
import logger from "../config/logger";
import APIError from "../utils/APIError";

export const validateBody = (dtoClass: any) => {
    return function (req: Request, res: Response, next: NextFunction) {
        const output: any = plainToClass(dtoClass, req.body);
        validate(output, { skipMissingProperties: true }).then(errors => {
            if (errors.length > 0) {
                next(new APIError({
                    message: 'Validation Error',
                    status: httpStatus.BAD_REQUEST,
                    errors: errors
                }))
            } else {
                req.body = output;
                next();
            }
        });
    };
};
