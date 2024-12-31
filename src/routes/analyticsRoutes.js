const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { fetchGeneralStatsHandler, analyzeCategoryStatsHandler, computeMonthlyStatsHandler, identifySpendingPatternsHandler, compareUserSpendingHandler, generateMonthlyRankingHandler, calculateImpulsiveSpendingHandler, evaluateCategoryDiversityHandler } = require('../controllers/analyticsController');

const router = express.Router();

// Rutas
router.get('/general-summary', authenticateToken, fetchGeneralStatsHandler); // Resumen general de transacciones
router.get('/category-breakdown', authenticateToken, analyzeCategoryStatsHandler); // Desglose por categoría
router.get('/monthly-insights', authenticateToken, computeMonthlyStatsHandler); // Estadísticas mensuales
router.get('/spending-patterns', authenticateToken, identifySpendingPatternsHandler); // Patrones de gasto
router.get('/user-comparison', authenticateToken, compareUserSpendingHandler); // Comparativa con otros usuarios
router.get('/monthly-ranking', authenticateToken, generateMonthlyRankingHandler); // Ranking mensual
router.get('/impulse-metric', authenticateToken, calculateImpulsiveSpendingHandler); // Métrica de impulsividad
router.get('/category-diversity', authenticateToken, evaluateCategoryDiversityHandler); // Diversidad de categorías

module.exports = router;