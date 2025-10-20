import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Store } from './Store';
import { UserAccount } from './UserAccount';


interface PosOrderAttributes {
id: number;
pos_code: string;
store_id: number;
staff_user_id?: number | null;
subtotal: string | number;
total_amount: string | number;
payment_method?: 'cash' | 'card' | 'momo' | 'vietqr';
created_at?: Date;
}


interface PosOrderCreationAttributes extends Optional<PosOrderAttributes, 'id' | 'staff_user_id' | 'payment_method' | 'created_at'> {}


export class PosOrder extends Model<PosOrderAttributes, PosOrderCreationAttributes> implements PosOrderAttributes {
public id!: number;
public pos_code!: string;
public store_id!: number;
public staff_user_id?: number | null;
public subtotal!: string | number;
public total_amount!: string | number;
public payment_method?: 'cash' | 'card' | 'momo' | 'vietqr';
public readonly created_at!: Date;
}


PosOrder.init(
{
id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
pos_code: { type: DataTypes.STRING(64), allowNull: false, unique: true },
store_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
staff_user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
subtotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
total_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
payment_method: { type: DataTypes.ENUM('cash','card','momo','vietqr'), defaultValue: 'cash' },
created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},
{ sequelize, tableName: 'pos_order', timestamps: false }
);


PosOrder.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });
Store.hasMany(PosOrder, { foreignKey: 'store_id', as: 'pos_orders' });


PosOrder.belongsTo(UserAccount, { foreignKey: 'staff_user_id', as: 'staff' });
UserAccount.hasMany(PosOrder, { foreignKey: 'staff_user_id', as: 'pos_orders' });