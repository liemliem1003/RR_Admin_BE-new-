import { MenuItem } from '../models/MenuItem';
import { Product } from '../models/Product';
import { Menu } from '../models/Menu';

export class MenuItemService {
  // Lấy tất cả MenuItem (tuỳ chọn filter theo menuId)
  static async getAll(menuId?: string) {
    const options: any = {
      include: [
        { model: Product, as: 'product' }
      ]
    };
    if (menuId) options.where = { menuId };
    return await MenuItem.findAll(options);
  }

  // Lấy MenuItem theo id
  static async getById(id: string) {
    return await MenuItem.findByPk(id, {
      include: [
        { model: Product, as: 'product' },
        { model: Menu, as: 'menu' }
      ]
    });
  }

  // Tạo mới MenuItem
  static async create(data: any) {
    const { id, ...payload } = data; // bỏ id
    console.log('📥 Data gửi lên DB:', payload);

    try {
      const menuItem = await MenuItem.create(payload);
      console.log('✅ MenuItem tạo thành công:', menuItem.toJSON());
      return menuItem;
    } catch (err: any) {
      console.error('🔥 Lỗi khi tạo MenuItem:', err.message);
      if (err.parent) console.error('🔥 MySQL Error:', err.parent.sqlMessage);
      throw err;
    }
  }


  // Cập nhật MenuItem
  static async update(id: string, data: any) {
    const item = await MenuItem.findByPk(id);
    if (!item) throw new Error('MenuItem not found');
    return await item.update(data);
  }

  // Xoá MenuItem
  static async remove(id: string) {
    const item = await MenuItem.findByPk(id);
    if (!item) throw new Error('MenuItem not found');
    await item.destroy();
    return true;
  }

  // Tạo MenuItem từ Product đã có (thêm vào menu)
  static async addProductToMenu(menu_id: number, product_id: number, priceOverride?: number) {
    const product = await Product.findByPk(product_id);
    if (!product) throw new Error('Product not found');

    return await MenuItem.create({
      menu_id,
      product_id,
      display_name: product.name,
      price: priceOverride ?? product.base_price,
      available: 1,
      sort_order: 1 // có thể chỉnh sau
    });
  }
  static async getByMenu(menu_id: string) {
    return await MenuItem.findAll({
      where: { menu_id },
      include: [{ model: Product, as: 'product' }]
    });
  }
}
