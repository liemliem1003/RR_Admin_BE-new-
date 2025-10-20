import { Order } from '../models/Order';

export class OrderService {
  static async getAll() {
    return await Order.findAll();
  }

  static async getById(id: string) {
    return await Order.findByPk(id);
  }

  static async create(data: any) {
    return await Order.create(data);
  }

  static async update(id: string, data: any) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');
    return await order.update(data);
  }

  static async remove(id: string) {
    const order = await Order.findByPk(id);
    if (!order) throw new Error('Order not found');
    await order.destroy();
    return true;
  }
}
