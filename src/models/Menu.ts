import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Store } from './Store';


interface MenuAttributes {
id: number;
store_id: number;
name: string;
is_default?: number;
note?: string | null;
created_at?: Date;
updated_at?: Date | null;
deleted_at?: Date | null;
}


interface MenuCreationAttributes extends Optional<MenuAttributes, 'id' | 'is_default' | 'note' | 'updated_at' | 'deleted_at'> {}


export class Menu extends Model<MenuAttributes, MenuCreationAttributes> implements MenuAttributes {
public id!: number;
public store_id!: number;
public name!: string;
public is_default?: number;
public note?: string | null;
public readonly created_at!: Date;
public readonly updated_at!: Date;
public deleted_at?: Date | null;
}


Menu.init(
{
id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
store_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
name: { type: DataTypes.STRING(255), allowNull: false },
is_default: { type: DataTypes.TINYINT, defaultValue: 0 },
note: { type: DataTypes.STRING(512), allowNull: true },
created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
updated_at: { type: DataTypes.DATE },
deleted_at: { type: DataTypes.DATE, allowNull: true },
},
{ sequelize, tableName: 'menu', timestamps: false }
);


Menu.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });
Store.hasMany(Menu, { foreignKey: 'store_id', as: 'menus' });