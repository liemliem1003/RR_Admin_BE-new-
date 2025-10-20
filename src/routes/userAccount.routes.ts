import { Router } from 'express';
import { UserAccountController } from '../controllers/userAccount.controller';
import { authenticate } from '../middleware/auth.middleware';

const router = Router();

// 🟩 Lấy toàn bộ user accounts
router.get('/', authenticate, UserAccountController.getAll);

// 🟦 Lấy thông tin 1 user theo id
router.get('/:id', authenticate, UserAccountController.getById);

// 🟨 Tạo mới user account
router.post('/', authenticate, UserAccountController.create);

// 🟧 Cập nhật thông tin user
router.put('/:id', authenticate, UserAccountController.update);

// 🟥 Xóa user account
router.delete('/:id', authenticate, UserAccountController.remove);

// 🟪 Lấy danh sách user theo role
router.get('/role/:role', authenticate, UserAccountController.getByRole);

// 🟫 Lấy danh sách user theo store_id
router.get('/store/:storeId', authenticate, UserAccountController.getByStore);

// ⚙️ Bật/tắt trạng thái hoạt động
router.patch('/:id/toggle-active', authenticate, UserAccountController.toggleActive);

export default router;
