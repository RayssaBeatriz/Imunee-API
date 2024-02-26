module.exports = {
  mysql: {
    dialect: 'mysql',
      host: "tutorial.mysql.database.azure.com",
      port: 3306,
      database: "CID",
      username: "projeto",
      password: "123"
  },
  development: {
    dialect: 'sqlite',
    storage: './data/database.sqlite',
  },
};