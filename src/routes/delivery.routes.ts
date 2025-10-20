import { Router } from 'express';
import { DeliveryController } from '../controllers/delivery.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, DeliveryController.getAll);
router.get('/:id', authenticate, DeliveryController.getById);
router.post('/', authenticate, DeliveryController.create);
router.put('/:id', authenticate, DeliveryController.update);
router.delete('/:id', authenticate, DeliveryController.remove);

export default router;
