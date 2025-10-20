import { Sequelize } from 'sequelize';
import { env } from './env';

export const sequelize = new Sequelize(
  env.db.name,
  env.db.user,
  env.db.pass,
  {
    host: env.db.host,
    port: env.db.port,
    dialect: 'mysql',
    logging: console.log, // dùng logger riêng sau này
    pool: {
      max: 10,
      min: 0,
      acquire: 30000,
      idle: 10000
    },
    define: {
      timestamps: true, // auto tạo createdAt, updatedAt
      underscored: true // snake_case column
    }
  }
);

// Test kết nối DB
export const testDBConnection = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected.');
  } catch (err) {
    console.error('❌ Unable to connect to DB:', err);
    process.exit(1);
  }
};
