import { Router } from 'express';
import { MenuController } from '../controllers/menu.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

router.get('/', MenuController.getAll);
router.get('/:id', MenuController.getById);
router.post('/', authenticate, MenuController.create);
router.put('/:id', authenticate, MenuController.update);
router.delete('/:id', authenticate, MenuController.remove);

export default router;
