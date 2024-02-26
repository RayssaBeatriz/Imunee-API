const express = require('express');
const router = express.Router();
const vacinaController = require('../controllers/vacinaController');

router.post('/', vacinaController.createVacina);
router.get('/', vacinaController.getVacina);
router.put('/', vacinaController.putVacina);
router.delete('/', vacinaController.deleteVacina);

module.exports = router;