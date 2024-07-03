import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('pombal-db', 'pombal-db_owner', 'VPkaUWnKQ6Z5', {
    host: 'ep-winter-dust-a59jb62y.us-east-2.aws.neon.tech',
    dialect: 'postgres',
    timezone: 'America/Sao_Paulo',
    ssl: true,
    dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false 
    }
  }
});