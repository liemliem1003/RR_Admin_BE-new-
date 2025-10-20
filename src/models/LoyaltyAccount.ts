import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { UserAccount } from './UserAccount';
import { LoyaltyRule } from './LoyaltyRule';


interface LoyaltyAccountAttributes {
id: number;
user_id: number;
points?: number;
loyalty_rule_id: number;
tier?: 'none' | 'bronze' | 'silver' | 'gold' | 'platinum';
updated_at?: Date;
created_at?: Date;
}


interface LoyaltyAccountCreationAttributes extends Optional<LoyaltyAccountAttributes, 'id' | 'points' | 'tier' | 'updated_at' | 'created_at'> {}


export class LoyaltyAccount extends Model<LoyaltyAccountAttributes, LoyaltyAccountCreationAttributes> implements LoyaltyAccountAttributes {
public id!: number;
public user_id!: number;
public points?: number;
public loyalty_rule_id!: number;
public tier?: 'none' | 'bronze' | 'silver' | 'gold' | 'platinum';
public readonly updated_at!: Date;
public readonly created_at!: Date;
}


LoyaltyAccount.init(
{
id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: false, unique: true },
points: { type: DataTypes.BIGINT.UNSIGNED, defaultValue: 0 },
loyalty_rule_id :{ type: DataTypes.BIGINT.UNSIGNED},
tier: { type: DataTypes.ENUM('none','bronze','silver','gold','platinum'), defaultValue: 'none' },
updated_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
},
{ sequelize, tableName: 'loyalty_account', timestamps: false }
);


LoyaltyAccount.belongsTo(UserAccount, { foreignKey: 'user_id', as: 'user' });
UserAccount.hasOne(LoyaltyAccount, { foreignKey: 'user_id', as: 'loyalty_account' });

LoyaltyAccount.belongsTo(LoyaltyRule, { foreignKey: 'loyalty_rule_id', as: 'rule' });
LoyaltyRule.hasMany(LoyaltyAccount, { foreignKey: 'loyalty_rule_id', as: 'accounts' });