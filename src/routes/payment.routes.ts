import { Router } from 'express';
import { PaymentController } from '../controllers/payment.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, PaymentController.getAll);
router.get('/:id', authenticate, PaymentController.getById);
router.post('/', authenticate, PaymentController.create);
router.put('/:id', authenticate, PaymentController.update);
router.delete('/:id', authenticate, PaymentController.remove);

export default router;
