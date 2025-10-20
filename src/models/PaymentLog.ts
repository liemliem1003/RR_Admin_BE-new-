import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Order } from './Order';


interface PaymentLogAttributes {
id: number;
order_id: number;
provider: 'momo' | 'vietqr' | 'other';
provider_transaction_id?: string | null;
amount: string | number;
status?: 'init' | 'pending' | 'success' | 'failed' | 'refunded';
raw_response?: object | null;
created_at?: Date;
}


interface PaymentLogCreationAttributes extends Optional<PaymentLogAttributes, 'id' | 'provider_transaction_id' | 'status' | 'raw_response' | 'created_at'> {}


export class PaymentLog extends Model<PaymentLogAttributes, PaymentLogCreationAttributes> implements PaymentLogAttributes {
public id!: number;
public order_id!: number;
public provider!: 'momo' | 'vietqr' | 'other';
public provider_transaction_id?: string | null;
public amount!: string | number;
public status?: 'init' | 'pending' | 'success' | 'failed' | 'refunded';
public raw_response?: object | null;
public readonly created_at!: Date;
}


PaymentLog.init(
{
id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
provider: { type: DataTypes.ENUM('momo','vietqr','other'), allowNull: false },
provider_transaction_id: { type: DataTypes.STRING(255), allowNull: true },
amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
status: { type: DataTypes.ENUM('init','pending','success','failed','refunded'), defaultValue: 'init' },
raw_response: { type: DataTypes.JSON, allowNull: true },
created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},
{ sequelize, tableName: 'payment_log', timestamps: false }
);


PaymentLog.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasMany(PaymentLog, { foreignKey: 'order_id', as: 'payment_logs' });