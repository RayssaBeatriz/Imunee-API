const express = require('express');
const router = express.Router();
const vacinacaoController = require('../controllers/vacinacaoController');

router.post('/', vacinacaoController.createVacinacao);
router.get('/', vacinacaoController.getVacinacao);
router.put('/', vacinacaoController.putVacinacao);
router.delete('/', vacinacaoController.deleteVacinacao);

module.exports = router;