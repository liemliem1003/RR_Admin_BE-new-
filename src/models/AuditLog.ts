import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';
import { UserAccount } from './UserAccount';


interface AuditLogAttributes {
    id: number;
    entity_type: string;
    entity_id?: number | null;
    user_id?: number | null;
    action: string;
    payload?: object | null;
    created_at?: Date;
}


interface AuditLogCreationAttributes extends Optional<AuditLogAttributes, 'id' | 'entity_id' | 'user_id' | 'payload' | 'created_at'> { }


export class AuditLog extends Model<AuditLogAttributes, AuditLogCreationAttributes> implements AuditLogAttributes {
    public id!: number;
    public entity_type!: string;
    public entity_id?: number | null;
    public user_id?: number | null;
    public action!: string;
    public payload?: object | null;
    public readonly created_at!: Date;
}


AuditLog.init(
    {
        id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
        entity_type: { type: DataTypes.STRING(64), allowNull: false },
        entity_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
        user_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
        action: { type: DataTypes.STRING(64), allowNull: false },
        payload: { type: DataTypes.JSON, allowNull: true },
        created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
    },
    { sequelize, tableName: 'audit_log', timestamps: false }
);


AuditLog.belongsTo(UserAccount, { foreignKey: 'user_id', as: 'user' });
UserAccount.hasMany(AuditLog, { foreignKey: 'user_id', as: 'audit_logs' });