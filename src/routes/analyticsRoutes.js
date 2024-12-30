const express = require('express');
const { authenticateToken } = require('../middlewares/authMiddleware');
const { getDashboardGeneralStats, getDashboardStatsByCategory, getDashboardMonthlyStats, getFrequentExpensesStats, getUserComparisonStats, getMonthlyRankingStats, getGuiltMetricStats } = require('../controllers/analyticsController');

const router = express.Router();

// Rutas
router.get('/general', authenticateToken, getDashboardGeneralStats);
router.get('/categories', authenticateToken, getDashboardStatsByCategory);
router.get('/monthly', authenticateToken, getDashboardMonthlyStats);
router.get('/frequent', authenticateToken, getFrequentExpensesStats);
router.get('/comparison', authenticateToken, getUserComparisonStats);
router.get('/ranking', authenticateToken, getMonthlyRankingStats);
router.get('/guilt', authenticateToken, getGuiltMetricStats);

module.exports = router;