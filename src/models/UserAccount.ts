import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Store } from './Store';
import { LoyaltyRule } from './LoyaltyRule'; // 👈 thêm để liên kết cấp độ

interface UserAccountAttributes {
  id: number;
  uuid: string;
  phone?: string | null;
  email?: string | null;
  password_hash?: string | null;
  display_name?: string | null;
  avatar_url?: string | null;
  role?: 'end_user' | 'admin' | 'store_manager' | 'staff';
  store_id?: number | null;
  is_active?: number;
  loyalty_point?: number;        // tổng điểm tích lũy
  available_point?: number;      // điểm có thể sử dụng
  current_level_id?: number | null; // cấp hiện tại
  next_level_id?: number | null;    // cấp kế tiếp
  created_at?: Date;
  updated_at?: Date | null;
  deleted_at?: Date | null;
}

interface UserAccountCreationAttributes
  extends Optional<
    UserAccountAttributes,
    | 'id'
    | 'phone'
    | 'email'
    | 'password_hash'
    | 'display_name'
    | 'avatar_url'
    | 'role'
    | 'store_id'
    | 'is_active'
    | 'loyalty_point'
    | 'available_point'
    | 'current_level_id'
    | 'next_level_id'
    | 'updated_at'
    | 'deleted_at'
  > {}

export class UserAccount
  extends Model<UserAccountAttributes, UserAccountCreationAttributes>
  implements UserAccountAttributes
{
  public id!: number;
  public uuid!: string;
  public phone?: string | null;
  public email?: string | null;
  public password_hash?: string | null;
  public display_name?: string | null;
  public avatar_url?: string | null;
  public role?: 'end_user' | 'admin' | 'store_manager' | 'staff';
  public store_id?: number | null;
  public is_active?: number;
  public loyalty_point?: number;
  public available_point?: number;
  public current_level_id?: number | null;
  public next_level_id?: number | null;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
  public deleted_at?: Date | null;
}

UserAccount.init(
  {
    id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
    uuid: { type: DataTypes.CHAR(64), allowNull: false, unique: true },
    phone: { type: DataTypes.STRING(32), allowNull: true },
    email: { type: DataTypes.STRING(255), allowNull: true },
    password_hash: { type: DataTypes.STRING(255), allowNull: true },
    display_name: { type: DataTypes.STRING(255), allowNull: true },
    avatar_url: { type: DataTypes.STRING(1024), allowNull: true },
    role: { type: DataTypes.ENUM('end_user', 'admin', 'store_manager', 'staff'), defaultValue: 'end_user' },
    store_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    is_active: { type: DataTypes.TINYINT, defaultValue: 1 },

    // 🧮 Loyalty system
    loyalty_point: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    available_point: { type: DataTypes.INTEGER.UNSIGNED, defaultValue: 0 },
    current_level_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
    next_level_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },

    created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    updated_at: { type: DataTypes.DATE },
    deleted_at: { type: DataTypes.DATE, allowNull: true },
  },
  { sequelize, tableName: 'user_account', timestamps: false }
);

// Quan hệ với Store
UserAccount.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });
Store.hasMany(UserAccount, { foreignKey: 'store_id', as: 'users' });

// Quan hệ với LoyaltyRule
UserAccount.belongsTo(LoyaltyRule, { foreignKey: 'current_level_id', as: 'current_level' });
UserAccount.belongsTo(LoyaltyRule, { foreignKey: 'next_level_id', as: 'next_level' });
