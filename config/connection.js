// config/connection.js

const { Sequelize } = require('sequelize');

// Database connection configuration
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USERNAME, process.env.DB_PASSWORD, {
  host: process.env.DB_HOST,
  dialect: 'mysql',
  // Other options as needed
});

module.exports = sequelize;
