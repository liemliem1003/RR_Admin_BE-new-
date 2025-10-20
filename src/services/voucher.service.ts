import { Voucher } from '../models/Voucher';

export class VoucherService {
  static async getAll() {
    return await Voucher.findAll();
  }

  static async getById(id: string) {
    return await Voucher.findByPk(id);
  }

  static async create(data: any) {
    return await Voucher.create(data);
  }

  static async update(id: string, data: any) {
    const voucher = await Voucher.findByPk(id);
    if (!voucher) throw new Error('Voucher not found');
    return await voucher.update(data);
  }

  static async remove(id: string) {
    const voucher = await Voucher.findByPk(id);
    if (!voucher) throw new Error('Voucher not found');
    await voucher.destroy();
    return true;
  }
}
