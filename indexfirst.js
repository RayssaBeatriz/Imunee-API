const express = require('express');
const { Sequelize, DataTypes } = require('sequelize'); // Importação das bibliotecas

// Em seguida, criamos uma instância do aplicativo Express e definimos a porta em que o servidor irá escutar. A porta pode ser definida através da variável de ambiente process.env.PORT ou, se não estiver definida, será usada a porta 3000.
const app = express();
const port = process.env.PORT || 3000;

// Estabelecemos a conexão com o banco de dados SQLite utilizando o Sequelize. Configuramos o Sequelize para usar o dialeto SQLite e especificamos o caminho do arquivo de banco de dados.
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite'
});

// Definimos o modelo User utilizando o método sequelize.define(). Passamos como argumento o nome do modelo e um objeto que define os campos e suas propriedades. Nesse caso, o modelo User possui os campos id, name, email e password, cada um com seu tipo e restrições.
const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
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
    allowNull: false
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

const local_vacinacao = sequelize.define('local_vacinacao', {
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
  }, 
  timestamps: true, // Adiciona as colunas createdAt e updatedAt automaticamente
  underscored: true // Converte o formato das colunas para snake_case
});

const vacina = sequelize.define('vacina', {
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
  },
  
  timestamps: true, // Adiciona as colunas createdAt e updatedAt automaticamente
  underscored: true // Converte o formato das colunas para snake_case
});

const vacinacao = sequelize.define('vacina', {
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
  },
  
  timestamps: true, // Adiciona as colunas createdAt e updatedAt automaticamente
  underscored: true // Converte o formato das colunas para snake_case
});

// Sincronizamos o modelo com o banco de dados utilizando o método sequelize.sync(). Esse método cria automaticamente a tabela no banco de dados se ela não existir.
sequelize.sync()
  .then(() => {
    console.log('Banco de dados e tabelas criadas com sucesso.');
  })
  .catch((error) => {
    console.error('Erro ao criar database:', error);
  });

// Configuramos o middleware express.json() para processar as requisições com corpo no formato JSON. Isso permite que o aplicativo receba e interprete dados enviados por meio de requisições JSON.
app.use(express.json());

// AQUI FICAM AS ROTAS

//ROTAS DE USUARIO
app.get('/users', async (req, res) => {
  try {
    const users = await User.findAll();
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/users', async (req, res) => {
  const { nome, email, senha, data_nascimento, cpf, tipo, n_registro } = req.body;

  try {
    const user = await User.create({ nome, email, senha, data_nascimento, cpf, tipo, n_registro });
    res.json( user);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/users/:id', async (req, res) => {
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
    user.tipo = tipo;
    user.n_registro = n_registro;

    await user.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/users/:id', async (req, res) => {
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
});

//ROTAS DE LOCAL_VACINACAO

app.get('/local_vacinacao', async (req, res) => {
  try {
    const localvacinacao = await local_vacinacao.findAll();
    res.json(localvacinacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/local_vacinacao', async (req, res) => {
  const { nome, endereco } = req.body;

  try {
    const local_vacinacao = await local_vacinacao.create({ nome, endereco });
    res.json({ id: local_vacinacao.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/local_vacinacao/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, endereco } = req.body;

  try {
    const local_vacinacao = await local_vacinacao.findByPk(id);
    if (!local_vacinacao) {
      res.status(404).json({ error: 'Local_vacinacao not found' });
      return;
    }

    local_vacinacao.nome = nome;
    local_vacinacao.endereco = endereco;

    await local_vacinacao.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/local_vacinacao/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const local_vacinacao = await local_vacinacao.findByPk(id);
    if (!local_vacinacao) {
      res.status(404).json({ error: 'local_vacinacao not found' });
      return;
    }

    await local_vacinacao.destroy();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

//ROTAS VACINA

app.get('/vacina', async (req, res) => {
  try {
    const vacinaa = await vacina.findAll();
    res.json(vacinaa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/vacina', async (req, res) => {
  const { nome, t_prox_dose } = req.body;

  try {
    const vacina = await vacina.create({ nome, t_prox_dose });
    res.json({ id: vacina.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/vacina/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, t_prox_dose } = req.body;

  try {
    const vacina = await vacina.findByPk(id);
    if (!vacina) {
      res.status(404).json({ error: 'vacina not found' });
      return;
    }

    vacina.nome = nome;
    vacina.t_prox_dose = t_prox_dose;

    await vacina.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/vacina/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vacina = await vacina.findByPk(id);
    if (!vacina) {
      res.status(404).json({ error: 'vacina not found' });
      return;
    }

    await vacina.destroy();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


//ROTAS VACINAÇÃO

app.get('/vacinacao', async (req, res) => {
  try {
    const vacinacaoo = await vacinacao.findAll();
    res.json(vacinacaoo);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.post('/vacinacao', async (req, res) => {
  const { data, id_vacina } = req.body;

  try {
    const vacinacao = await vacinacao.create({ data, id_vacina  });
    res.json({ id: vacina.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.put('/vacinacao/:id', async (req, res) => {
  const { id } = req.params;
  const { data, id_vacina } = req.body;

  try {
    const vacinacao = await vacinacao.findByPk(id);
    if (!vacinacao) {
      res.status(404).json({ error: 'vacinacao not found' });
      return;
    }

    vacinacao.data = data;
    vacinacao.id_vacina  = id_vacina ;

    await vacinacao.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.delete('/vacinacao/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const vacinacao = await vacinacao.findByPk(id);
    if (!vacinacao) {
      res.status(404).json({ error: 'vacina not found' });
      return;
    }

    await vacinacao.destroy();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Iniciamos o servidor e o fazemos escutar a porta especificada. Quando o servidor é iniciado, a mensagem "Server is running on port {port}" é exibida no console.
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});