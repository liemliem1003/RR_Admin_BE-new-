import { LoyaltyRule } from "../models/LoyaltyRule";

export class LoyaltyService {
  static async getAll() {
    return await LoyaltyRule.findAll();
  }

  static async getById(id: string) {
    return await LoyaltyRule.findByPk(id);
  }

  static async create(data: any) {
    return await LoyaltyRule.create(data);
  }

  static async update(id: string, data: any) {
    const loyalty = await LoyaltyRule.findByPk(id);
    if (!loyalty) throw new Error('Loyalty not found');
    return await loyalty.update(data);
  }

  static async remove(id: string) {
    const loyalty = await LoyaltyRule.findByPk(id);
    if (!loyalty) throw new Error('Loyalty not found');
    await loyalty.destroy();
    return true;
  }
}
