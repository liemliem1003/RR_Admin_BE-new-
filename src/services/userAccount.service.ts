import { UserAccount } from '../models/UserAccount';
import { Store } from '../models/Store';
import crypto from 'crypto';
import bcrypt from 'bcryptjs';

export class UserAccountService {
  // 🟩 Lấy tất cả user accounts (có include store nếu có)
  static async getAll() {
    return await UserAccount.findAll({
      include: [
        {
          model: Store,
          as: 'store',
          attributes: ['id', 'name'],
        },
      ],
      order: [['id', 'ASC']],
    });
  }

  // 🟦 Lấy chi tiết 1 user theo id
  static async getById(id: number) {
    const user = await UserAccount.findByPk(id, {
      include: [
        {
          model: Store,
          as: 'store',
          attributes: ['id', 'name'],
        },
      ],
    });
    if (!user) throw new Error('UserAccount not found');
    return user;
  }

  // 🟨 Tạo user mới
  static async create(data: any) {
    if (!data.uuid) {
      const now = new Date();
      const dateStr =
        String(now.getDate()).padStart(2, '0') +
        String(now.getMonth() + 1).padStart(2, '0') +
        now.getFullYear() +
        String(now.getHours()).padStart(2, '0') +
        String(now.getMinutes()).padStart(2, '0') +
        String(now.getSeconds()).padStart(2, '0');
      const raw = `${data.phone || 'unknown'}-${dateStr}`;
      const hashed = crypto.createHash('sha256').update(raw).digest('hex');
      const reversed = hashed.split('').reverse().join('');
      data.uuid = reversed;
    }
    const password_hash = await bcrypt.hash(data.password, 10);
    data.password_hash = password_hash
    console.log(data);

    // nếu cần xử lý logic, có thể thêm ở đây, ví dụ: mã hóa password
    return await UserAccount.create(data);
  }

  // 🟧 Cập nhật user
  static async update(id: number, data: any) {
    const user = await UserAccount.findByPk(id);
    if (!user) throw new Error('UserAccount not found');
    return await user.update(data);
  }

  // 🟥 Xóa user (xóa mềm nếu bạn có cột deleted_at)
  static async remove(id: number) {
    const user = await UserAccount.findByPk(id);
    if (!user) throw new Error('UserAccount not found');
    await user.destroy(); // hoặc user.update({ deleted_at: new Date() });
    return true;
  }

  // 🟪 Lấy danh sách theo role (ví dụ admin, staff, v.v.)
  static async getByRole(role: 'end_user' | 'admin' | 'store_manager' | 'staff') {
    return await UserAccount.findAll({
      where: { role },
      include: [{ model: Store, as: 'store', attributes: ['id', 'name'] }],
    });
  }

  // 🟫 Lấy danh sách user theo store_id
  static async getByStore(storeId: number) {
    return await UserAccount.findAll({
      where: { store_id: storeId },
      include: [{ model: Store, as: 'store', attributes: ['id', 'name'] }],
    });
  }

  // ⚙️ Kích hoạt / vô hiệu hóa user
  static async toggleActive(id: number, is_active: boolean | number) {
    const user = await UserAccount.findByPk(id);
    if (!user) throw new Error('UserAccount not found');
    user.is_active = is_active ? 1 : 0;
    await user.save();
    return user;
  }
}
