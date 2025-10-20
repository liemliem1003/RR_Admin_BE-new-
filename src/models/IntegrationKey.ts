import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { Store } from './Store';


interface IntegrationKeyAttributes {
id: number;
store_id?: number | null;
provider: 'momo' | 'vietqr' | 'ahamove' | 'other';
client_id?: string | null;
client_secret?: string | null;
meta?: object | null;
is_active?: number;
created_at?: Date;
updated_at?: Date | null;
}


interface IntegrationKeyCreationAttributes extends Optional<IntegrationKeyAttributes, 'id' | 'store_id' | 'client_id' | 'client_secret' | 'meta' | 'is_active' | 'updated_at' | 'created_at'> {}


export class IntegrationKey extends Model<IntegrationKeyAttributes, IntegrationKeyCreationAttributes> implements IntegrationKeyAttributes {
public id!: number;
public store_id?: number | null;
public provider!: 'momo' | 'vietqr' | 'ahamove' | 'other';
public client_id?: string | null;
public client_secret?: string | null;
public meta?: object | null;
public is_active?: number;
public readonly created_at!: Date;
public readonly updated_at!: Date;
}


IntegrationKey.init(
{
id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
store_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
provider: { type: DataTypes.ENUM('momo','vietqr','ahamove','other'), allowNull: false },
client_id: { type: DataTypes.STRING(255), allowNull: true },
client_secret: { type: DataTypes.TEXT, allowNull: true },
meta: { type: DataTypes.JSON, allowNull: true },
is_active: { type: DataTypes.TINYINT, defaultValue: 1 },
created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
updated_at: { type: DataTypes.DATE },
},
{ sequelize, tableName: 'integration_key', timestamps: false }
);


IntegrationKey.belongsTo(Store, { foreignKey: 'store_id', as: 'store' });
Store.hasMany(IntegrationKey, { foreignKey: 'store_id', as: 'integration_keys' });