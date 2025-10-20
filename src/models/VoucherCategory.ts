import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { Voucher } from './Voucher';
import { Category } from './Category';


export class VoucherCategory extends Model {
public voucher_id!: number;
public category_id!: number;
}


VoucherCategory.init(
{
voucher_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, primaryKey: true },
category_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, primaryKey: true },
},
{ sequelize, tableName: 'voucher_category', timestamps: false }
);


Voucher.belongsToMany(Category, { through: VoucherCategory, foreignKey: 'voucher_id', otherKey: 'category_id', as: 'applicable_categories' });
Category.belongsToMany(Voucher, { through: VoucherCategory, foreignKey: 'category_id', otherKey: 'voucher_id', as: 'vouchers' });