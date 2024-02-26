const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

const Vacinacao = sequelize.define('Vacinacao', {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    data: {
      type: DataTypes.STRING,
      allowNull: false
    },
    id_vacina: {
      type: DataTypes.STRING,
      allowNull: false
    }  
})


module.exports = Vacinacao;