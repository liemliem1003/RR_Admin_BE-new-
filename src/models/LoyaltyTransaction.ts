import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { LoyaltyAccount } from './LoyaltyAccount';
import { Order } from './Order';


interface LoyaltyTransactionAttributes {
id: number;
loyalty_account_id: number;
change_amount: number;
reason?: string | null;
reference_order_id?: number | null;
created_at?: Date;
}


interface LoyaltyTransactionCreationAttributes extends Optional<LoyaltyTransactionAttributes, 'id' | 'reason' | 'reference_order_id' | 'created_at'> {}


export class LoyaltyTransaction extends Model<LoyaltyTransactionAttributes, LoyaltyTransactionCreationAttributes> implements LoyaltyTransactionAttributes {
public id!: number;
public loyalty_account_id!: number;
public change_amount!: number;
public reason?: string | null;
public reference_order_id?: number | null;
public readonly created_at!: Date;
}


LoyaltyTransaction.init(
{
id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
loyalty_account_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
change_amount: { type: DataTypes.BIGINT, allowNull: false },
reason: { type: DataTypes.STRING(255), allowNull: true },
reference_order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},
{ sequelize, tableName: 'loyalty_transaction', timestamps: false }
);


LoyaltyTransaction.belongsTo(LoyaltyAccount, { foreignKey: 'loyalty_account_id', as: 'account' });
LoyaltyAccount.hasMany(LoyaltyTransaction, { foreignKey: 'loyalty_account_id', as: 'transactions' });


LoyaltyTransaction.belongsTo(Order, { foreignKey: 'reference_order_id', as: 'order' });
Order.hasMany(LoyaltyTransaction, { foreignKey: 'reference_order_id', as: 'loyalty_transactions' });