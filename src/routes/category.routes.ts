import { Router } from 'express';
import { CategoryController } from '../controllers/category.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, CategoryController.getAll);
router.get('/:id', authenticate, CategoryController.getById);
router.post('/', authenticate, CategoryController.create);
router.put('/:id', authenticate, CategoryController.update);
router.delete('/:id', authenticate, CategoryController.remove);

export default router;
