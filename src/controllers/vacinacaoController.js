const Vacinacao = require('../models/Vacinacao');

//ROTAS VACINAÇÃO
// Criar Vacinação
exports.createVacinacao = async (req, res) => {
  try {
    const { data, id_vacina } = req.body;
    const novaVacinacao = await Vacinacao.create({ data, id_vacina });
    res.status(201).json(novaVacinacao);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Listar Vacinação
exports.getVacinacao = async (req, res) => {
  try {
    const vacinacoes = await Vacinacao.findAll();
    res.json(vacinacoes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Atualizar Vacinação
exports.putVacinacao = async (req, res) => {
  const { id } = req.params;
  const { data, id_vacina } = req.body;

  try {
    const vacinacao = await Vacinacao.findByPk(id);
    if (!vacinacao) {
      res.status(404).json({ error: 'vacinacao not found' });
      return;
    }

    vacinacao.data = data;
    vacinacao.id_vacina = id_vacina;

    await vacinacao.save();

    res.sendStatus(200);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}

// Deletar Vacinação
exports.deleteVacinacao = async (req, res) => {
  const { id } = req.params;

  try {
    const vacinacao = await Vacinacao.findByPk(id);
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
};
