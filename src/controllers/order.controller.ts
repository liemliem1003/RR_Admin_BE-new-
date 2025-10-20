import { Request, Response, NextFunction } from 'express';
import { OrderService } from '../services/order.service';

export class OrderController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const orders = await OrderService.getAll();
      res.json({ orders });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.getById(req.params.id);
      res.json({ order });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.create(req.body);
      res.status(201).json({ order });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const order = await OrderService.update(req.params.id, req.body);
      res.json({ order });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await OrderService.remove(req.params.id);
      res.json({ message: 'Order deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}
