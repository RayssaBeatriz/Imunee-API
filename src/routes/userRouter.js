const express = require('express');
const userController = require('../controllers/userController');
const { authenticateToken } = require('../middleware/authMiddleware');

const router = express.Router();

router.post('/', userController.create);
router.post('/login', userController.login)
router.get('/', authenticateToken, userController.getUser);
router.put('/:id', authenticateToken, userController.putUser);
router.delete('/:id', authenticateToken, userController.deleteUser);

module.exports = router;