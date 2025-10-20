import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { UserAccount } from './UserAccount';
import { Store } from './Store';

// ===============================
// 1️⃣ Interface định nghĩa thuộc tính bảng
// ===============================
export interface OrderAttributes {
  id: number;
  order_code: string;
  user_id?: number | null;
  store_id: number;
  staff_user_id?: number | null;
  pos_id?: number | null;
  source?: 'pos' | 'web' | 'app' | 'manual';
  subtotal: string | number;
  total_amount: string | number;
  delivery_fee: string | number;
  discount_amount: string | number;
  final_amount: string | number;
  payment_method?: 'cash' | 'card' | 'momo' | 'vietqr' | 'cod' | 'third_party';
  payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  order_status?: 'pending' | 'processing' | 'accepted' | 'preparing' | 'shipped' | 'delivered' | 'cancelled' | 'refunded';
  address?: object | null;
  contact_name?: string | null;
  contact_phone?: string | null;
  note?: string | null;
  created_at?: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}

// ===============================
// 2️⃣ Interface cho create
// ===============================
export interface OrderCreationAttributes
  extends Optional<
    OrderAttributes,
    | 'id'
    | 'user_id'
    | 'staff_user_id'
    | 'pos_id'
    | 'source'
    | 'payment_method'
    | 'payment_status'
    | 'order_status'
    | 'address'
    | 'contact_name'
    | 'contact_phone'
    | 'note'
    | 'updated_at'
    | 'deleted_at'
  > {}

// ===============================
// 3️⃣ Model class Sequelize
// ===============================
export class Order
  extends Model<OrderAttributes, OrderCreationAttributes>
  implements OrderAttributes
{
  public id!: number;
  public order_code!: string;
  public user_id?: number | null;
  public store_id!: number;
  public staff_user_id?: number | null;
  public pos_id?: number | null;
  public source?: 'pos' | 'web' | 'app' | 'manual';
  public subtotal!: string | number;
  public total_amount!: string | number;
  public delivery_fee!: string | number;
  public discount_amount!: string | number;
  public final_amount!: string | number;
  public payment_method?: 'cash' | 'card' | 'momo' | 'vietqr' | 'cod' | 'third_party';
  public payment_status?: 'pending' | 'paid' | 'failed' | 'refunded';
  public order_status?:
    | 'pending'
    | 'processing'
    | 'accepted'
    | 'preparing'
    | 'shipped'
    | 'delivered'
    | 'cancelled'
    | 'refunded';
  public address?: object | null;
  public contact_name?: string | null;
  public contact_phone?: string | null;
  public note?: string | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public deleted_at?: Date | null;
}

// ===============================
// 4️⃣ Cấu hình Sequelize
// ===============================
Order.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    order_code: { type: DataTypes.STRING(64), allowNull: false, unique: true },

    user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    store_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false },
    staff_user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    pos_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },

    source: {
      type: DataTypes.ENUM('pos', 'web', 'app', 'manual'),
      defaultValue: 'web',
    },

    subtotal: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    total_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },
    delivery_fee: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.0 },
    discount_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false, defaultValue: 0.0 },
    final_amount: { type: DataTypes.DECIMAL(12, 2), allowNull: false },

    payment_method: {
      type: DataTypes.ENUM('cash', 'card', 'momo', 'vietqr', 'cod', 'third_party'),
      defaultValue: 'cash',
    },
    payment_status: {
      type: DataTypes.ENUM('pending', 'paid', 'failed', 'refunded'),
      defaultValue: 'pending',
    },
    order_status: {
      type: DataTypes.ENUM(
        'pending',
        'processing',
        'accepted',
        'preparing',
        'shipped',
        'delivered',
        'cancelled',
        'refunded'
      ),
      defaultValue: 'pending',
    },

    address: { type: DataTypes.JSON, allowNull: true },
    contact_name: { type: DataTypes.STRING(255), allowNull: true },
    contact_phone: { type: DataTypes.STRING(32), allowNull: true },
    note: { type: DataTypes.TEXT, allowNull: true },

    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  },
  {
    sequelize,
    tableName: 'order',
    timestamps: false, // vì đã có cột tự định nghĩa created_at, updated_at
  }
);

// ===============================
// 5️⃣ Quan hệ giữa các bảng
// ===============================
Order.belongsTo(UserAccount, { foreignKey: 'user_id', as: 'user' });
UserAccount.hasMany(Order, { foreignKey: 'user_id', as: 'orders' });

Store.hasMany(Order, { foreignKey: 'store_id', as: 'orders' });
Order.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });

Order.belongsTo(UserAccount, { foreignKey: 'staff_user_id', as: 'staff' });

// ===============================
// 6️⃣ Index gợi ý (nếu bạn sync bằng Sequelize CLI)
// ===============================
// Có thể thêm khi migrate:
// sequelize.queryInterface.addIndex('order', ['source']);
// sequelize.queryInterface.addIndex('order', ['store_id']);
// sequelize.queryInterface.addIndex('order', ['created_at']);
