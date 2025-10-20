import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';


interface CategoryAttributes {
id: number;
name: string;
slug?: string | null;
parent_id?: number | null;
sort_order?: number;
created_at?: Date;
updated_at?: Date | null;
deleted_at?: Date | null;
}


interface CategoryCreationAttributes extends Optional<CategoryAttributes, 'id' | 'slug' | 'parent_id' | 'sort_order' | 'updated_at' | 'deleted_at'> {}


export class Category extends Model<CategoryAttributes, CategoryCreationAttributes> implements CategoryAttributes {
public id!: number;
public name!: string;
public slug?: string | null;
public parent_id?: number | null;
public sort_order?: number;
public readonly created_at!: Date;
public readonly updated_at!: Date;
public deleted_at?: Date | null;
}


Category.init(
{
id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
name: { type: DataTypes.STRING(255), allowNull: false },
slug: { type: DataTypes.STRING(255), allowNull: true },
parent_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
updated_at: { type: DataTypes.DATE },
deleted_at: { type: DataTypes.DATE, allowNull: true },
},
{ sequelize, tableName: 'category', timestamps: false }
);


Category.belongsTo(Category, { foreignKey: 'parent_id', as: 'parent' });
Category.hasMany(Category, { foreignKey: 'parent_id', as: 'children' });