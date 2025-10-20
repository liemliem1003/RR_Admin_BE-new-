import { Request, Response, NextFunction } from 'express';
import { AuthService } from '../services/auth.service';

export class AuthController {
  static async register(req: Request, res: Response, next: NextFunction) {
    try {
      const { name, email, password, phone, role, is_active } = req.body;
      const user = await AuthService.registerUser(name, email, password, phone, role, is_active);
      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }

  static async login(req: Request, res: Response, next: NextFunction) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      res.json(result);
    } catch (err) {
      next(err);
    }
  }

  static async changePassword(req: Request, res: Response, next: NextFunction) {
    try {
      const userId = (req as any).user.id; // lấy từ middleware authenticate
      const { oldPassword, newPassword } = req.body;
      await AuthService.changePassword(userId, oldPassword, newPassword);
      res.json({ message: 'Password changed successfully' });
    } catch (err) {
      next(err);
    }
  }
}
