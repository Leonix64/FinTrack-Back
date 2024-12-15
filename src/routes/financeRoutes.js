const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { createTransaction, getUserTransactions, updateUserTransaction, deleteUserTransaction } = require('../controllers/financeController');

const router = express.Router();

// Rutas
router.post('/', authenticateToken, createTransaction);
router.get('/', authenticateToken, getUserTransactions);
router.put('/:id', authenticateToken, updateUserTransaction);
router.delete('/:id', authenticateToken, deleteUserTransaction);

module.exports = router;