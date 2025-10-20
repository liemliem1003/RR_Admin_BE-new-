import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db';
import { Voucher } from './Voucher';
import { Store } from './Store';


export class VoucherStore extends Model {
public voucher_id!: number;
public store_id!: number;
}


VoucherStore.init(
{
voucher_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, primaryKey: true },
store_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, primaryKey: true },
},
{ sequelize, tableName: 'voucher_store', timestamps: false }
);


Voucher.belongsToMany(Store, { through: VoucherStore, foreignKey: 'voucher_id', otherKey: 'store_id', as: 'applicable_stores' });
Store.belongsToMany(Voucher, { through: VoucherStore, foreignKey: 'store_id', otherKey: 'voucher_id', as: 'vouchers' });