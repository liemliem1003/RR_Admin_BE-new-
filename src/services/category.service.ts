import { Op } from 'sequelize';
import { Category } from '../models/Category';

export class CategoryService {
  /**
   * Lấy danh sách category có phân trang, tìm kiếm, sort, filter parent
   */
  static async getAll(options: {
    page?: number;
    limit?: number;
    sort?: string;
    order?: 'asc' | 'desc';
    search?: string;
    parent_id?: number | null;
  } = {}) {
    const {
      page = 1,
      limit = 10,
      sort = 'id',
      order = 'asc',
      search = '',
      parent_id,
    } = options;

    const offset = (page - 1) * limit;

    // Điều kiện lọc
    const where: any = {};
    if (search) {
      where.name = { [Op.like]: `%${search}%` };
    }
    if (parent_id !== undefined) {
      // Cho phép lọc null hoặc theo id cụ thể
      where.parent_id = parent_id === null ? null : parent_id;
    }

    // Lấy dữ liệu + tổng count (song song để nhanh hơn)
    const { rows, count } = await Category.findAndCountAll({
      where,
      include: [{ model: Category, as: 'parent' }],
      order: [[sort, order.toUpperCase()]],
      limit,
      offset,
    });

    return {
      items: rows,
      page,
      limit,
      total: count,
      total_pages: Math.ceil(count / limit),
    };
  }

  /**
   * Lấy category theo ID
   */
  static async getById(id: string) {
    return await Category.findByPk(id, {
      include: [{ model: Category, as: 'parent' }],
    });
  }

  /**
   * Tạo mới category
   */
  static async create(data: any) {
    return await Category.create(data);
  }

  /**
   * Cập nhật category
   */
  static async update(id: string, data: any) {
    const category = await Category.findByPk(id);
    if (!category) throw new Error('Category not found');
    return await category.update(data);
  }

  /**
   * Xóa category
   */
  static async remove(id: string) {
    const category = await Category.findByPk(id);
    if (!category) throw new Error('Category not found');
    await category.destroy();
    return true;
  }
}
