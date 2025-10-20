import { Router } from 'express';
import { MenuItemController } from '../controllers/menu-item.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// Lấy danh sách MenuItem theo menu
router.get('/menu/:menuId', MenuItemController.getByMenu);

// Thêm MenuItem mới
router.post('/', authenticate, MenuItemController.create);

// Cập nhật MenuItem
router.put('/:id', authenticate, MenuItemController.update);

// Xoá MenuItem
router.delete('/:id', authenticate, MenuItemController.remove);

export default router;
