const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

// ROTAS DE USUARIO
class UserController{
  // Criar Usuário
  async create(req, res){
    try {
      const { nome, email, senha, data_nascimento, cpf, tipo, n_registro } = req.body;

      const existingUser = await User.findOne({ where: {email} })
      
      if (existingUser) {
        return res.status(409).json({ error: 'Username already exists' });
      }
      

      const newUser = await User.create({ nome, email, senha, data_nascimento, cpf, tipo, n_registro });
      
      return res.status(201).json(newUser);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }

  // Login Autenticação
  async login(req, res){
    const { email, senha } = req.body;
    
    try{
      const user = await User.findOne({where: {email}});
      if (!user) {
        return res.status(401).json({ error: 'Authentication failed. E-mail ou senha inválida.' });
      }
      const isPasswordValid = await bcrypt.compare(senha, user.senha);
      if (!isPasswordValid) {
        return res.status(401).json({ error: 'Authentication failed. E-mail ou senha inválida.' });
      }
      const token = jwt.sign({ userId: user.id }, 'your-secret-key', { expiresIn: '1h' });
      console.log('Token:', token);

      return res.json({token});
    } catch (err){
      console.error(err);
      return res.status(500).json({error: 'Internal Server Error'});
    }
  }
  async getUser(req, res){
    try{
      const users = await User.findAll({
        attributes: ['id', 'nome', 'email', 'senha', 'data_nascimento', 'cpf', 'tipo', 'n_registro'],
      });
      return res.json(users);
    } catch (err){
      console.error(err);
      return res.status(500).json({ error: 'Internal Server Error' })
    }
  }
  async putUser(req, res){
    const { id } = req.params;
    const { nome, email, senha, data_nascimento, cpf, tipo, n_registro } = req.body;
  
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      user.nome = nome;
      user.email = email;
      user.senha = senha;
      user.data_nascimento = data_nascimento;
      user.cpf = cpf;
      user.tipo = tipo; // 'enf' ou 'administrador'
      user.n_registro = n_registro;
  
      await user.save();
  
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
  async deleteUser(req, res){
    const { id } = req.params;
  
    try {
      const user = await User.findByPk(id);
      if (!user) {
        res.status(404).json({ error: 'User not found' });
        return;
      }
  
      await user.destroy();
  
      res.sendStatus(200);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

module.exports = new UserController();