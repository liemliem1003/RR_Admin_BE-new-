import { Request, Response, NextFunction } from 'express';
import { PaymentService } from '../services/payment.service';

export class PaymentController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const payments = await PaymentService.getAll();
      res.json({ payments });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const payment = await PaymentService.getById(req.params.id);
      res.json({ payment });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const payment = await PaymentService.create(req.body);
      res.status(201).json({ payment });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const payment = await PaymentService.update(req.params.id, req.body);
      res.json({ payment });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await PaymentService.remove(req.params.id);
      res.json({ message: 'Payment deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}
