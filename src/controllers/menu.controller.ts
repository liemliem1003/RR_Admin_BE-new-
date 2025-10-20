import { Request, Response, NextFunction } from 'express';
import { MenuService } from '../services/menu.service';

export class MenuController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const menus = await MenuService.getAll();
      res.json({ menus });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const menu = await MenuService.getById(req.params.id);
      res.json({ menu });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const menu = await MenuService.create(req.body);
      res.status(201).json({ menu });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const menu = await MenuService.update(req.params.id, req.body);
      res.json({ menu });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await MenuService.remove(req.params.id);
      res.json({ message: 'Menu deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}
