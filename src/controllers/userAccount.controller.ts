import { Request, Response, NextFunction } from 'express';
import { UserAccountService } from '../services/userAccount.service';

export class UserAccountController {
  // 🟩 Lấy toàn bộ user accounts
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserAccountService.getAll();
      res.json({ users });
    } catch (err) {
      next(err);
    }
  }

  // 🟦 Lấy chi tiết 1 user theo id
  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserAccountService.getById(Number(req.params.id));
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  // 🟨 Tạo mới user
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserAccountService.create(req.body);
      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  }

  // 🟧 Cập nhật thông tin user
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const user = await UserAccountService.update(Number(req.params.id), req.body);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }

  // 🟥 Xóa user
  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await UserAccountService.remove(Number(req.params.id));
      res.json({ message: 'User account deleted successfully' });
    } catch (err) {
      next(err);
    }
  }

  // 🟪 Lấy danh sách theo role
  static async getByRole(req: Request, res: Response, next: NextFunction) {
    try {
      const { role } = req.params;
      const users = await UserAccountService.getByRole(role as any);
      res.json({ users });
    } catch (err) {
      next(err);
    }
  }

  // 🟫 Lấy danh sách user theo store_id
  static async getByStore(req: Request, res: Response, next: NextFunction) {
    try {
      const users = await UserAccountService.getByStore(Number(req.params.storeId));
      res.json({ users });
    } catch (err) {
      next(err);
    }
  }

  // ⚙️ Bật/tắt trạng thái tài khoản
  static async toggleActive(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const { is_active } = req.body;
      const user = await UserAccountService.toggleActive(Number(id), is_active);
      res.json({ user });
    } catch (err) {
      next(err);
    }
  }
}
