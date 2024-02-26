const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database');

class Vacina extends Model { }

Vacina.init(
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
    t_prox_dose: {
      type: DataTypes.STRING,
      allowNull: false
    }
  },
  {
    sequelize,
    modelName: 'Vacina',
  }
);


module.exports = Vacina;