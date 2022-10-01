const { Sequelize } = require('sequelize');

require('dotenv').config();

const connection = new Sequelize(
  process.env.DB_V2_NAME,
  process.env.DB_USER,
  process.env.DB_PWD,
  {
    dialect: 'mysql',
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    define: {
      underscored: true,
    },
  }
);

// creates tables
(async () => {
  await connection.authenticate();
  await connection.sync({ alter: true });
})();

module.exports = connection;
