import { Request, Response, NextFunction } from 'express';
import { MenuItemService } from '../services/menuItem.service';

export class MenuItemController {
  // Lấy danh sách MenuItem theo menu
  static async getByMenu(req: Request, res: Response, next: NextFunction) {
    try {
      const { menuId } = req.params;
      const items = await MenuItemService.getByMenu(menuId);
      res.json({ items });
    } catch (err) {
      next(err);
    }
  }

  // Tạo MenuItem mới
  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const item = await MenuItemService.create(req.body);
      res.status(201).json({ item });
    } catch (err) {
      next(err);
    }
  }

  // Cập nhật MenuItem
  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      const item = await MenuItemService.update(id, req.body);
      res.json({ item });
    } catch (err) {
      next(err);
    }
  }

  // Xoá MenuItem
  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const { id } = req.params;
      await MenuItemService.remove(id);
      res.json({ message: 'MenuItem deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}
