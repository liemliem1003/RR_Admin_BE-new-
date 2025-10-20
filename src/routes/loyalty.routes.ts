import { Router } from 'express';
import { LoyaltyController } from '../controllers/loyalty.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, LoyaltyController.getAll);
router.get('/:id', authenticate, LoyaltyController.getById);
router.post('/', authenticate, LoyaltyController.create);
router.put('/:id', authenticate, LoyaltyController.update);
router.delete('/:id', authenticate, LoyaltyController.remove);

export default router;
