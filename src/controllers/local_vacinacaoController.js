//ROTAS DE LOCAL_VACINACAO

//Listar local
exports.getLocal_vacinacao = async (req, res) => {
  try {
    const localvacinacao = await local_vacinacao.findAll();
    res.json(localvacinacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Criar local_vacinao
exports.createLocal_vacinacao = async (req, res) => {
  const { nome, endereco } = req.body;

  try {
    const local_vacinacao = await local_vacinacao.create({ nome, endereco });
    res.json({ id: local_vacinacao.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Atualizar local_vacinação
exports.putLocal_vacinacao = async (req, res) => {
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
};

//Deletar local_vacinação
exports.deleteLocal_vacinacao = async (req, res) => {
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
};