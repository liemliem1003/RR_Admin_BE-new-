import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Menu } from './Menu';
import { Product } from './Product';


interface MenuItemAttributes {
    id: number;
    menu_id: number;
    product_id: number;
    display_name: string;
    price: string | number;
    available?: number;
    sort_order?: number;
    meta?: object | null;
    created_at?: Date;
    updated_at?: Date | null;
    deleted_at?: Date | null;
}


interface MenuItemCreationAttributes extends Optional<MenuItemAttributes, 'id' | 'available' | 'sort_order' | 'meta' | 'updated_at' | 'deleted_at'> { }


export class MenuItem extends Model<MenuItemAttributes, MenuItemCreationAttributes> implements MenuItemAttributes {
    public id!: number;
    public menu_id!: number;
    public product_id!: number;
    public display_name!: string;
    public price!: string | number;
    public available?: number;
    public sort_order?: number;
    public meta?: object | null;
    public readonly created_at!: Date;
    public readonly updated_at!: Date;
    public deleted_at?: Date | null;
}


MenuItem.init(
    {
        id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
        menu_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
        display_name: { type: DataTypes.STRING(255), allowNull: false },
        price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
        available: { type: DataTypes.TINYINT, defaultValue: 1 },
        sort_order: { type: DataTypes.INTEGER, defaultValue: 0 },
        meta: { type: DataTypes.JSON, allowNull: true },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
        updated_at: { type: DataTypes.DATE },
        deleted_at: { type: DataTypes.DATE, allowNull: true },
    },
    { sequelize, tableName: 'menu_item', timestamps: false }
);


MenuItem.belongsTo(Menu, { foreignKey: 'menu_id', as: 'menu' });
Menu.hasMany(MenuItem, { foreignKey: 'menu_id', as: 'items' });


MenuItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(MenuItem, { foreignKey: 'product_id', as: 'menu_items' });