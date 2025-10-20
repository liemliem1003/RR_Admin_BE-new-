import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';


interface VoucherAttributes {
    id: number;
    code: string;
    name?: string | null;
    type: string;
    rules?: object | null;
    description?: string | null;
    usage_limit?: number | null;
    user_limit?: number | null;
    start_at?: Date | null;
    end_at?: Date | null;
    is_active?: number;
    can_combine?: number;
    created_at?: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}
interface VoucherCreationAttributes extends Optional<VoucherAttributes, 'id' | 'name' | 'rules' | 'description' | 'usage_limit' | 'user_limit' | 'start_at' | 'end_at' | 'is_active' | 'can_combine' | 'updated_at' | 'deleted_at'> { }


export class Voucher extends Model<VoucherAttributes, VoucherCreationAttributes> implements VoucherAttributes {
    public id!: number;
    public code!: string;
    public name?: string | null;
    public type!: string;
    public rules?: object | null;
    public description?: string | null;
    public usage_limit?: number | null;
    public user_limit?: number | null;
    public start_at?: Date | null;
    public end_at?: Date | null;
    public is_active?: number;
    public can_combine?: number;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public deleted_at?: Date | null;
}


Voucher.init(
    {
        id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
        code: { type: DataTypes.STRING(64), allowNull: false, unique: true },
        name: { type: DataTypes.STRING(255), allowNull: true },
        type: { type: DataTypes.ENUM('fixed', 'percent', 'free_shipping', 'buy_x_get_y', 'min_total_gift', 'product_gift', 'first_order', 'birthday', 'category_discount', 'limited_time', 'combo_discount'), allowNull: false },
        rules: { type: DataTypes.JSON, allowNull: true },
        description: { type: DataTypes.TEXT, allowNull: true },
        usage_limit: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
        user_limit: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
        start_at: { type: DataTypes.DATE, allowNull: true },
        end_at: { type: DataTypes.DATE, allowNull: true },
        is_active: { type: DataTypes.TINYINT, defaultValue: 1 },
        can_combine: { type: DataTypes.TINYINT, defaultValue: 0 },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE },
        deleted_at: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, tableName: 'voucher', timestamps: false }
);