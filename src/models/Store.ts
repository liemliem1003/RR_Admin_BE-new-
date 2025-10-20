import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Region } from './Region';


interface StoreAttributes {
    id: number;
    region_id: number;
    name: string;
    slug?: string | null;
    address?: string | null;
    location?: any | null;
    phone?: string | null;
    email?: string | null;
    timezone?: string;
    is_active?: number;
    created_at?: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
    current_loyalty_point: number
}


interface StoreCreationAttributes extends Optional<StoreAttributes, 'id' | 'slug' | 'address' | 'location' | 'phone' | 'email' | 'timezone' | 'is_active' | 'updated_at' | 'deleted_at'> { }


export class Store extends Model<StoreAttributes, StoreCreationAttributes> implements StoreAttributes {
    public id!: number;
    public region_id!: number;
    public name!: string;
    public slug?: string | null;
    public address?: string | null;
    public location?: any | null;
    public phone?: string | null;
    public email?: string | null;
    public timezone?: string = 'Asia/Ho_Chi_Minh';
    public is_active?: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public deleted_at?: Date | null;
    public current_loyalty_point: number = 0

}


Store.init(
    {
        id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
        region_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        name: { type: DataTypes.STRING(255), allowNull: false },
        slug: { type: DataTypes.STRING(255), allowNull: true },
        address: { type: DataTypes.TEXT, allowNull: true },
        location: { type: DataTypes.GEOMETRY('POINT'), allowNull: true },
        phone: { type: DataTypes.STRING(32), allowNull: true },
        email: { type: DataTypes.STRING(128), allowNull: true },
        timezone: { type: DataTypes.STRING(64), defaultValue: 'Asia/Ho_Chi_Minh' },
        is_active: { type: DataTypes.TINYINT, defaultValue: 1 },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE },
        deleted_at: { type: DataTypes.DATE, allowNull: true },
        current_loyalty_point: { type: DataTypes.BIGINT.UNSIGNED }
    },
    { sequelize, tableName: 'store', timestamps: false }
);


Store.belongsTo(Region, { foreignKey: 'region_id', as: 'region' });
Region.hasMany(Store, { foreignKey: 'region_id', as: 'stores' });