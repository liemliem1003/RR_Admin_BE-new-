import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Order } from './Order';


interface DeliveryAttributes {
    id: number;
    order_id: number;
    provider?: 'ahamo ve' | 'inhouse' | 'third_party';
    provider_job_id?: string | null;
    status?: 'requested' | 'assigned' | 'picked_up' | 'delivering' | 'completed' | 'failed' | 'cancelled';
    courier?: object | null;
    eta_min?: number | null;
    eta_max?: number | null;
    created_at?: Date;
    updated_at?: Date | null;
}


interface DeliveryCreationAttributes extends Optional<DeliveryAttributes, 'id' | 'provider' | 'provider_job_id' | 'status' | 'courier' | 'eta_min' | 'eta_max' | 'created_at' | 'updated_at'> { }


export class Delivery extends Model<DeliveryAttributes, DeliveryCreationAttributes> implements DeliveryAttributes {
    public id!: number;
    public order_id!: number;
    public provider?: 'ahamo ve' | 'inhouse' | 'third_party';
    public provider_job_id?: string | null;
    public status?: 'requested' | 'assigned' | 'picked_up' | 'delivering' | 'completed' | 'failed' | 'cancelled';
    public courier?: object | null;
    public eta_min?: number | null;
    public eta_max?: number | null;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
}


Delivery.init(
    {
        id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
        order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        provider: { type: DataTypes.ENUM('ahamo ve', 'inhouse', 'third_party'), defaultValue: 'third_party' },
        provider_job_id: { type: DataTypes.STRING(255), allowNull: true },
        status: { type: DataTypes.ENUM('requested', 'assigned', 'picked_up', 'delivering', 'completed', 'failed', 'cancelled'), defaultValue: 'requested' },
        courier: { type: DataTypes.JSON, allowNull: true },
        eta_min: { type: DataTypes.INTEGER, allowNull: true },
        eta_max: { type: DataTypes.INTEGER, allowNull: true },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE },
    },
    { sequelize, tableName: 'delivery', timestamps: false }
);


Delivery.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasMany(Delivery, { foreignKey: 'order_id', as: 'deliveries' });