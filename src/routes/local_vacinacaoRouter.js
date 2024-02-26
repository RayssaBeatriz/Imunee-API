const express = require('express');
const router = express.Router();
const local_vacinacaoController = require('../controllers/local_vacinacaoController');

router.post('/', local_vacinacaoController.createLocal_vacinacao);
router.get('/', local_vacinacaoController.getLocal_vacinacao);
router.put('/', local_vacinacaoController.putLocal_vacinacao);
router.delete('/', local_vacinacaoController.deleteLocal_vacinacao);

module.exports = router;