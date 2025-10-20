import {Region} from '../models/Region';

export class RegionService {
  static async getAll() {
    return await Region.findAll({
      include: [{ model: Region, as: 'parent', attributes: ['id', 'name'] }],
      order: [['id', 'ASC']],
    });
  }

  static async getById(id: number) {
    const region = await Region.findByPk(id, {
      include: [{ model: Region, as: 'children' }],
    });
    if (!region) throw new Error('Region not found');
    return region;
  }

  static async create(data: any) {
    return await Region.create(data);
  }

  static async update(id: number, data: any) {
    const region = await Region.findByPk(id);
    if (!region) throw new Error('Region not found');
    return await region.update(data);
  }

  static async remove(id: number) {
    const region = await Region.findByPk(id);
    if (!region) throw new Error('Region not found');
    await region.destroy();
    return true;
  }

  // Lấy danh sách theo level (ví dụ: level = 1 => city)
  static async getByLevel(level: number) {
    return await Region.findAll({ where: { level } });
  }

  // Lấy danh sách con theo parent_id
  static async getChildren(parentId: number) {
    return await Region.findAll({ where: { parent_id: parentId } });
  }
}
