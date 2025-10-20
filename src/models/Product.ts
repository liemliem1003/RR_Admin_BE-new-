import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Category } from './Category';


interface ProductAttributes {
id: number;
sku?: string | null;
name: string;
description?: string | null;
category_id?: number | null;
image_url?: string | null;
base_price: string | number;
is_active?: number;
created_at?: Date;
updated_at?: Date | null;
deleted_at?: Date | null;
}


interface ProductCreationAttributes extends Optional<ProductAttributes, 'id' | 'sku' | 'description' | 'category_id' | 'image_url' | 'is_active' | 'updated_at' | 'deleted_at'> {}


export class Product extends Model<ProductAttributes, ProductCreationAttributes> implements ProductAttributes {
public id!: number;
public sku?: string | null;
public name!: string;
public description?: string | null;
public category_id?: number | null;
public image_url?: string | null;
public base_price!: string | number;
public is_active?: number;
public readonly created_at!: Date;
public readonly updated_at!: Date;
public deleted_at?: Date | null;
}


Product.init(
{
id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
sku: { type: DataTypes.STRING(64), allowNull: true },
name: { type: DataTypes.STRING(255), allowNull: false },
description: { type: DataTypes.TEXT, allowNull: true },
category_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
image_url: { type: DataTypes.STRING(1024), allowNull: true },
base_price: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.0 },
is_active: { type: DataTypes.TINYINT, defaultValue: 1 },
created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
updated_at: { type: DataTypes.DATE },
deleted_at: { type: DataTypes.DATE, allowNull: true },
},
{ sequelize, tableName: 'product', timestamps: false }
);


Product.belongsTo(Category, { foreignKey: 'category_id', as: 'category' });
Category.hasMany(Product, { foreignKey: 'category_id', as: 'products' });