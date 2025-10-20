import { Request, Response, NextFunction } from 'express';
import { LoyaltyService } from '../services/loyalty.service';

export class LoyaltyController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const loyalties = await LoyaltyService.getAll();
      res.json({ loyalties });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const loyalty = await LoyaltyService.getById(req.params.id);
      res.json({ loyalty });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const loyalty = await LoyaltyService.create(req.body);
      res.status(201).json({ loyalty });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const loyalty = await LoyaltyService.update(req.params.id, req.body);
      res.json({ loyalty });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await LoyaltyService.remove(req.params.id);
      res.json({ message: 'Loyalty deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}
