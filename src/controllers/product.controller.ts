import { Request, Response, NextFunction } from 'express';
import { ProductService } from '../services/product.service';

export class ProductController {
  static async getAll(req: Request, res: Response, next: NextFunction) {
    try {
      const products = await ProductService.getAll();
      res.json({ products });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.getById(req.params.id);
      res.json({ product });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.create(req.body);
      res.status(201).json({ product });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const product = await ProductService.update(req.params.id, req.body);
      res.json({ product });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await ProductService.remove(req.params.id);
      res.json({ message: 'Product deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}
