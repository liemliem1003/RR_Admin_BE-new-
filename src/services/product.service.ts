import { Product } from '../models/Product';

export class ProductService {
  static async getAll() {
    return await Product.findAll();
  }

  static async getById(id: string) {
    return await Product.findByPk(id);
  }

  static async create(data: any) {
    return await Product.create(data);
  }

  static async update(id: string, data: any) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    return await product.update(data);
  }

  static async remove(id: string) {
    const product = await Product.findByPk(id);
    if (!product) throw new Error('Product not found');
    await product.destroy();
    return true;
  }
}
