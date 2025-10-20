import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';


interface RolePermissionAttributes {
id: number;
role_name: string;
permissions?: object | null;
}


interface RolePermissionCreationAttributes extends Optional<RolePermissionAttributes, 'id' | 'permissions'> {}


export class RolePermission extends Model<RolePermissionAttributes, RolePermissionCreationAttributes> implements RolePermissionAttributes {
public id!: number;
public role_name!: string;
public permissions?: object | null;
}


RolePermission.init(
{
id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
role_name: { type: DataTypes.STRING(64), allowNull: false, unique: true },
permissions: { type: DataTypes.JSON, allowNull: true },
},
{ sequelize, tableName: 'role_permission', timestamps: false }
);