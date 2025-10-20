import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { Voucher } from './Voucher';
import { Product } from './Product';


export class VoucherProduct extends Model {
public voucher_id!: number;
public product_id!: number;
}


VoucherProduct.init(
{
voucher_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, primaryKey: true },
product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, primaryKey: true },
},
{ sequelize, tableName: 'voucher_product', timestamps: false }
);


Voucher.belongsToMany(Product, { through: VoucherProduct, foreignKey: 'voucher_id', otherKey: 'product_id', as: 'applicable_products' });
Product.belongsToMany(Voucher, { through: VoucherProduct, foreignKey: 'product_id', otherKey: 'voucher_id', as: 'vouchers' });