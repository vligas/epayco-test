import { NextFunction, Request, Response } from "express";

export const wrap = (fn: wrappedFn) => (...args: [Request, Response, NextFunction]) => fn(...args).catch(args[2])
type wrappedFn = (...args: any[]) => Promise<any>