const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: 'database.sqlite',
});

module.exports = sequelize;


// const Sequelize = require('sequelize');
// const config = require('./index.js');

// const env = process.env.NODE_ENV || 'development';

// const sequelize = new Sequelize(config[env]);

// module.exports = sequelize;