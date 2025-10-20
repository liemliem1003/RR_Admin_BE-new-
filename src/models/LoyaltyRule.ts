import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';

interface LoyaltyRuleAttributes {
  id: number;
  parent_id?: number | null;
  tier_name: string;
  min_points: number;
  multiplier: number;
  description?: string | null;
  is_active?: boolean;
  version?: number;
  created_at?: Date;
  updated_at?: Date;
}

interface LoyaltyRuleCreationAttributes
  extends Optional<
    LoyaltyRuleAttributes,
    'id' | 'parent_id' | 'description' | 'is_active' | 'version' | 'created_at' | 'updated_at'
  > {}

export class LoyaltyRule
  extends Model<LoyaltyRuleAttributes, LoyaltyRuleCreationAttributes>
  implements LoyaltyRuleAttributes
{
  public id!: number;
  public parent_id!: number | null;
  public tier_name!: string;
  public min_points!: number;
  public multiplier!: number;
  public description!: string | null;
  public is_active!: boolean;
  public version!: number;
  public readonly created_at!: Date;
  public readonly updated_at!: Date;
}

LoyaltyRule.init(
  {
    id: {
      type: DataTypes.BIGINT.UNSIGNED,
      autoIncrement: true,
      primaryKey: true,
    },
    parent_id: {
      type: DataTypes.BIGINT.UNSIGNED,
      allowNull: true,
      references: {
        model: 'loyalty_rule',
        key: 'id',
      },
      onDelete: 'SET NULL',
    },
    tier_name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    min_points: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 0,
    },
    multiplier: {
      type: DataTypes.DECIMAL(5, 2),
      allowNull: false,
      defaultValue: 1.0,
    },
    description: {
      type: DataTypes.STRING(255),
      allowNull: true,
    },
    is_active: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    },
    version: {
      type: DataTypes.INTEGER.UNSIGNED,
      allowNull: false,
      defaultValue: 1,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    tableName: 'loyalty_rule',
    timestamps: false, // vì bạn đã có created_at & updated_at thủ công
    indexes: [
      { name: 'idx_loyalty_tier_name', fields: ['tier_name'] },
      { name: 'idx_loyalty_parent_id', fields: ['parent_id'] },
      { name: 'idx_loyalty_version', fields: ['version'] },
    ],
  }
);

// Nếu bạn muốn thiết lập quan hệ cha - con (self association)
LoyaltyRule.hasMany(LoyaltyRule, {
  foreignKey: 'parent_id',
  as: 'children',
});

LoyaltyRule.belongsTo(LoyaltyRule, {
  foreignKey: 'parent_id',
  as: 'parent',
});
