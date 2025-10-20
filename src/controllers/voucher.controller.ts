import { Request, Response, NextFunction } from 'express';
import { VoucherService } from '../services/voucher.service';

export class VoucherController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const vouchers = await VoucherService.getAll();
      res.json({ vouchers });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const voucher = await VoucherService.getById(req.params.id);
      res.json({ voucher });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const voucher = await VoucherService.create(req.body);
      res.status(201).json({ voucher });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const voucher = await VoucherService.update(req.params.id, req.body);
      res.json({ voucher });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await VoucherService.remove(req.params.id);
      res.json({ message: 'Voucher deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}
