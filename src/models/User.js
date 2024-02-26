const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const bcrypt = require('bcrypt');

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  nome: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  senha: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  data_nascimento: {
    type: DataTypes.STRING,
    allowNull: false
  },
  cpf: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipo: {
    type: DataTypes.BOOLEAN,
    allowNull: false
  },
  n_registro: {
    type: DataTypes.STRING,
    allowNull: false
  },
   timestamps: true, // Adiciona as colunas createdAt e updatedAt automaticamente
  underscored: true // Converte o formato das colunas para snake_case
});

User.beforeCreate(async (user) => {
  const hashedPassword = await bcrypt.hash(user.senha, 10);
  user.senha = hashedPassword;
});

module.exports = User;