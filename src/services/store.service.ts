import { Region } from '../models/Region';
import { Store } from '../models/Store';

export class StoreService {
  static async getAll() {
    return await Store.findAll(
      {
        include: [{ model: Region, as: 'region' }],
      }
    );
  }

  static async getById(id: string) {
    return await Store.findByPk(id);
  }

  static async create(data: any) {
    return await Store.create(data);
  }

  static async update(id: string, data: any) {
    const store = await Store.findByPk(id);
    if (!store) throw new Error('Store not found');
    return await store.update(data);
  }

  static async remove(id: string) {
    const store = await Store.findByPk(id);
    if (!store) throw new Error('Store not found');
    await store.destroy();
    return true;
  }
}
