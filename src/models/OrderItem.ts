import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Order } from './Order';
import { Product } from './Product';
import { MenuItem } from './MenuItem';

interface OrderItemAttributes {
  id: number;
  order_id: number;
  product_id?: number | null;
  menu_item_id?: number | null;
  name: string;
  qty: number;
  unit_price: string | number;
  total_price: string | number;
  options?: object | null;
  created_at?: Date;
}

interface OrderItemCreationAttributes extends Optional<OrderItemAttributes, 'id' | 'product_id' | 'menu_item_id' | 'options' | 'created_at'> {}

export class OrderItem extends Model<OrderItemAttributes, OrderItemCreationAttributes> implements OrderItemAttributes {
  public id!: number;
  public order_id!: number;
  public product_id?: number | null;
  public menu_item_id?: number | null;
  public name!: string;
  public qty!: number;
  public unit_price!: string | number;
  public total_price!: string | number;
  public options?: object | null;
  public readonly created_at!: Date;
}

OrderItem.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    product_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    menu_item_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    name: { type: DataTypes.STRING(255), allowNull: false },
    qty: { type: DataTypes.INTEGER.UNSIGNED, allowNull: false, defaultValue: 1 },
    unit_price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    total_price: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    options: { type: DataTypes.JSON, allowNull: true },
    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  },
  { sequelize, tableName: 'order_item', timestamps: false }
);

OrderItem.belongsTo(Order, { foreignKey: 'order_id', as: 'order' });
Order.hasMany(OrderItem, { foreignKey: 'order_id', as: 'items' });

OrderItem.belongsTo(Product, { foreignKey: 'product_id', as: 'product' });
Product.hasMany(OrderItem, { foreignKey: 'product_id', as: 'order_items' });

OrderItem.belongsTo(MenuItem, { foreignKey: 'menu_item_id', as: 'menu_item' });
MenuItem.hasMany(OrderItem, { foreignKey: 'menu_item_id', as: 'order_items' });