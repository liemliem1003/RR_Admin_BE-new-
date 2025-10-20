import { DataTypes, Model, Optional } from 'sequelize';
import { sequelize } from '../config/db';


interface RegionAttributes {
id: number;
parent_id?: number | null;
name: string;
code?: string | null;
level?: number;
created_at?: Date;
updated_at?: Date;
deleted_at?: Date | null;
img?:string | null
}


interface RegionCreationAttributes extends Optional<RegionAttributes, 'id' | 'parent_id' | 'code' | 'level' | 'deleted_at'> {}


export class Region extends Model<RegionAttributes, RegionCreationAttributes> implements RegionAttributes {
public id!: number;
public parent_id?: number | null;
public name!: string;
public code?: string | null;
public level?: number;
public readonly created_at!: Date;
public readonly updated_at!: Date;
public deleted_at?: Date | null;
public img?:string | null
}


Region.init(
{
id: { type: DataTypes.BIGINT.UNSIGNED, autoIncrement: true, primaryKey: true },
parent_id: { type: DataTypes.BIGINT.UNSIGNED, allowNull: true },
name: { type: DataTypes.STRING(255), allowNull: false },
code: { type: DataTypes.STRING(64), allowNull: true },
level: { type: DataTypes.TINYINT.UNSIGNED, defaultValue: 0 },
created_at: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
updated_at: { type: DataTypes.DATE },
deleted_at: { type: DataTypes.DATE, allowNull: true },
img:{ type: DataTypes.STRING(255), allowNull: false },
},
{ sequelize, tableName: 'region', timestamps: false }
);


Region.belongsTo(Region, { foreignKey: 'parent_id', as: 'parent' });
Region.hasMany(Region, { foreignKey: 'parent_id', as: 'children' });