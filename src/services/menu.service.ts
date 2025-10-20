import { Category } from '../models/Category';
import { Menu } from '../models/Menu';
import { MenuItem } from '../models/MenuItem';

export class MenuService {
  static async getAll() {
    return await Menu.findAll();
  }

  static async getById(id: string) {
    return await Menu.findByPk(id, {
      include: [
        {
          model: MenuItem,
          as: 'items', // tên alias của quan hệ Menu -> MenuItem
          // include: [
          //   {
          //     model: Category,
          //     as: 'category' // tên alias của quan hệ MenuItem -> Category
          //   }
          // ]
        }
      ]
    });
  }

  static async create(data: any) {
    return await Menu.create(data);
  }

  static async update(id: string, data: any) {
    const menu = await Menu.findByPk(id);
    if (!menu) throw new Error('Menu not found');
    return await menu.update(data);
  }

  static async remove(id: string) {
    const menu = await Menu.findByPk(id);
    if (!menu) throw new Error('Menu not found');
    await menu.destroy();
    return true;
  }
}
