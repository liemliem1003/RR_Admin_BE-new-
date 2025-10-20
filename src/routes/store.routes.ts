import { Router } from 'express';
import { StoreController } from '../controllers/store.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', StoreController.getAll);
router.get('/:id', StoreController.getById);
router.post('/', authenticate, StoreController.create);
router.put('/:id', authenticate, StoreController.update);
router.delete('/:id', authenticate, StoreController.remove);

export default router;
