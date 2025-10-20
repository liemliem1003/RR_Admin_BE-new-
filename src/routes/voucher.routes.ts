import { Router } from 'express';
import { VoucherController } from '../controllers/voucher.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', authenticate, VoucherController.getAll);
router.get('/:id', authenticate, VoucherController.getById);
router.post('/', authenticate, VoucherController.create);
router.put('/:id', authenticate, VoucherController.update);
router.delete('/:id', authenticate, VoucherController.remove);

export default router;
