import { Request, Response, NextFunction } from 'express';
import { DeliveryService } from '../services/delivery.service';

export class DeliveryController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const deliveries = await DeliveryService.getAll();
      res.json({ deliveries });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const delivery = await DeliveryService.getById(req.params.id);
      res.json({ delivery });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const delivery = await DeliveryService.create(req.body);
      res.status(201).json({ delivery });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const delivery = await DeliveryService.update(req.params.id, req.body);
      res.json({ delivery });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await DeliveryService.remove(req.params.id);
      res.json({ message: 'Delivery deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}
