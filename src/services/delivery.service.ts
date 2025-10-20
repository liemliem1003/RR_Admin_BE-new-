import { Delivery } from '../models/Delivery';

export class DeliveryService {
  static async getAll() {
    return await Delivery.findAll();
  }

  static async getById(id: string) {
    return await Delivery.findByPk(id);
  }

  static async create(data: any) {
    return await Delivery.create(data);
  }

  static async update(id: string, data: any) {
    const delivery = await Delivery.findByPk(id);
    if (!delivery) throw new Error('Delivery not found');
    return await delivery.update(data);
  }

  static async remove(id: string) {
    const delivery = await Delivery.findByPk(id);
    if (!delivery) throw new Error('Delivery not found');
    await delivery.destroy();
    return true;
  }
}
