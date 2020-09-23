import { Request, Response } from "express";

const mung = require('express-mung');
function format(body: any, req: Request, res: Response) {
  return {
    data: body,
  };
}

export default mung.json(format);
