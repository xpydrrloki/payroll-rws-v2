import { loginService } from '@/services/auth/login.service';
import { NextFunction, Request, Response } from 'express';

export class AuthController {
  async loginController(req: Request, res: Response, next: NextFunction) {
    try {
      const result = await loginService(req.body);

      res.status(200).send(result);
    } catch (error) {
      next(error);
    }
  }
}
