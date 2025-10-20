import { Request, Response, NextFunction } from 'express';
import { RegionService } from '../services/region.service';

export class RegionController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const regions = await RegionService.getAll();
      res.json({ regions });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const region = await RegionService.getById(id);
      res.json({ region });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const region = await RegionService.create(req.body);
      res.status(201).json({ region });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      const region = await RegionService.update(id, req.body);
      res.json({ region });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      const id = Number(req.params.id);
      await RegionService.remove(id);
      res.json({ message: 'Region deleted successfully' });
    } catch (err) {
      next(err);
    }
  }

  // 🔹 Lấy tất cả theo level (vd: city, district...)
  static async getByLevel(req: Request, res: Response, next: NextFunction) {
    try {
      const level = Number(req.params.level);
      const regions = await RegionService.getByLevel(level);
      res.json({ regions });
    } catch (err) {
      next(err);
    }
  }

  // 🔹 Lấy danh sách con theo parent_id
  static async getChildren(req: Request, res: Response, next: NextFunction) {
    try {
      const parentId = Number(req.params.parentId);
      const children = await RegionService.getChildren(parentId);
      res.json({ children });
    } catch (err) {
      next(err);
    }
  }
}
