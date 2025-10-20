import { Request, Response, NextFunction } from 'express';
import { StoreService } from '../services/store.service';

export class StoreController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const stores = await StoreService.getAll();
      res.json({ stores });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await StoreService.getById(req.params.id);
      res.json({ store });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await StoreService.create(req.body);
      res.status(201).json({ store });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const store = await StoreService.update(req.params.id, req.body);
      res.json({ store });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await StoreService.remove(req.params.id);
      res.json({ message: 'Store deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}
