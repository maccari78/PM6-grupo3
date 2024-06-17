import { NextFunction, Request, Response } from 'express';

export function Logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    `Middleware: método ${req.method} hacia la ruta ${req.path} a las ${new Date().toLocaleString()}`,
  );
  next();
}
