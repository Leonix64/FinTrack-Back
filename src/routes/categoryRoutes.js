const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { createCategory, getUserCategories, updateUserCategory, deleteUserCategory } = require('../controllers/categoryController');

const router = express.Router();

// Rutas
router.post('/', authenticateToken, createCategory);
router.get('/', authenticateToken, getUserCategories);
router.put('/:id', authenticateToken, updateUserCategory);
router.delete('/:id', authenticateToken, deleteUserCategory);

module.exports = router;