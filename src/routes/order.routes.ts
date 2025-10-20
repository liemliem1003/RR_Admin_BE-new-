import { Router } from 'express';
import { OrderController } from '../controllers/order.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, OrderController.getAll);
router.get('/:id', authenticate, OrderController.getById);
router.post('/', authenticate, OrderController.create);
router.put('/:id', authenticate, OrderController.update);
router.delete('/:id', authenticate, OrderController.remove);

export default router;
