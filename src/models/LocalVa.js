const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class LocalVa extends Model {}

LocalVa.init(
  {
    id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
    nome: {
      type: DataTypes.STRING,
    allowNull: false
  },
    endereco: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
    }
  }, 
  {
    sequelize,
    modelName: 'LocalVa',
  }
);

module.exports = LocalVa;