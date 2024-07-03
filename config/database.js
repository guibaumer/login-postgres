import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('login-next', 'login-next_owner', '7evoanbfXK5c', {
    host: 'ep-bold-haze-a52kiv57.us-east-2.aws.neon.tech',
    dialect: 'postgres',
    ssl: true,
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});