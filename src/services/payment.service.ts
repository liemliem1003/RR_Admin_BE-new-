import { PaymentLog } from "../models/PaymentLog";

export class PaymentService {
  static async getAll() {
    return await PaymentLog.findAll();
  }

  static async getById(id: string) {
    return await PaymentLog.findByPk(id);
  }

  static async create(data: any) {
    return await PaymentLog.create(data);
  }

  static async update(id: string, data: any) {
    const payment = await PaymentLog.findByPk(id);
    if (!payment) throw new Error('Payment not found');
    return await payment.update(data);
  }

  static async remove(id: string) {
    const payment = await PaymentLog.findByPk(id);
    if (!payment) throw new Error('Payment not found');
    await payment.destroy();
    return true;
  }
}
