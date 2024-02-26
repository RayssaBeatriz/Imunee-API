//ROTAS VACINA

//Listar vacina

exports.getVacina =  async  (req, res) => {
  try {
    const vacinaa = await vacina.findAll();
    res.json(vacinaa);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//Criar vacina
exports.createVacina = async (req, res) => {
  const { nome, t_prox_dose } = req.body;

  try {
    const vacina = await vacina.create({ nome, t_prox_dose });
    res.json({ id: vacina.id });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

//atualizar vacina
exports.putVacina = async (req, res) => {
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
};

exports.deleteVacina = async (req, res) => {
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
};