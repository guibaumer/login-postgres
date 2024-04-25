import { Sequelize } from "sequelize";
import {sequelize} from '../../config/database.js';

export const User = sequelize.define(
    "users",
    {
      name: Sequelize.STRING,
      lastname: Sequelize.STRING,
      email: Sequelize.STRING,
      password_hash: Sequelize.STRING,
      created_at: Sequelize.DATE,
      updated_at: Sequelize.DATE,
      id: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
    },
    {
      timestamps: false,
    }
  );

  export const Session = sequelize.define(
    "sessions",
    {
      sid: { type: Sequelize.STRING, primaryKey: true },
      sess: Sequelize.JSON,
      // expire: Sequelize.DATE
    },
    {
      timestamps: false,
    }
  )