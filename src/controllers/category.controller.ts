import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../services/category.service';
import { AuthRequest } from '../middleware/auth.middleware';

export class CategoryController {
  static async getAll(req: AuthRequest, res: Response, next: NextFunction) {
  // static async getAll(req: Request, res: Response, next: NextFunction) {
    console.log(req.user);
    
    try {
      const {
        page = '1',
        limit = '10',
        sort = 'id',
        order = 'asc',
        search = '',
        parent_id,
      } = req.query;

      const result = await CategoryService.getAll({
        page: Number(page),
        limit: Number(limit),
        sort: String(sort),
        order: order === 'desc' ? 'desc' : 'asc',
        search: String(search),
        parent_id: parent_id !== undefined ? Number(parent_id) : undefined,
      });

      res.json({
        category: result.items,
        page: result.page,
        limit: result.limit,
        total: result.total,
        total_pages: result.total_pages,
      });
    } catch (err) {
      next(err);
    }
  }

  static async getById(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.getById(req.params.id);
      res.json({ category });
    } catch (err) {
      next(err);
    }
  }

  static async create(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.create(req.body);
      res.status(201).json({ category });
    } catch (err) {
      next(err);
    }
  }

  static async update(req: Request, res: Response, next: NextFunction) {
    try {
      const category = await CategoryService.update(req.params.id, req.body);
      res.json({ category });
    } catch (err) {
      next(err);
    }
  }

  static async remove(req: Request, res: Response, next: NextFunction) {
    try {
      await CategoryService.remove(req.params.id);
      res.json({ message: 'Category deleted successfully' });
    } catch (err) {
      next(err);
    }
  }
}
