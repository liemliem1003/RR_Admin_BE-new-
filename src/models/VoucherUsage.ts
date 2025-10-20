import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Voucher } from './Voucher';
import { Order } from './Order';
import { UserAccount } from './UserAccount';


interface VoucherUsageAttributes {
id: number;
voucher_id: number;
order_id?: number | null;
user_id?: number | null;
used_at?: Date;
amount_discount?: string | number;
}


interface VoucherUsageCreationAttributes extends Optional<VoucherUsageAttributes, 'id' | 'order_id' | 'user_id' | 'used_at' | 'amount_discount'> {}


export class VoucherUsage extends Model<VoucherUsageAttributes, VoucherUsageCreationAttributes> implements VoucherUsageAttributes {
public id!: number;
public voucher_id!: number;
public order_id?: number | null;
public user_id?: number | null;
public readonly used_at!: Date;
public amount_discount?: string | number;
}


VoucherUsage.init(
{
id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
voucher_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
used_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
amount_discount: { type: DataTypes.DECIMAL(12, 2), defaultValue: 0.0 },
},
{ sequelize, tableName: 'voucher_usage', timestamps: false }
);


VoucherUsage.belongsTo(Voucher, { foreignKey: 'voucher_id', as: 'voucher' });
Voucher.hasMany(VoucherUsage, { foreignKey: 'voucher_id', as: 'usages' });


VoucherUsage.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasMany(VoucherUsage, { foreignKey: 'order_id', as: 'voucher_usages' });


VoucherUsage.belongsTo(UserAccount, { foreignKey: 'user_id', as: 'user' });
UserAccount.hasMany(VoucherUsage, { foreignKey: 'user_id', as: 'voucher_usages' });