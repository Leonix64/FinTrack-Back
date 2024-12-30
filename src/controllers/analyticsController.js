const { getGeneralStats, getStatsByCategory, getMonthlyStats, getFrequentExpenses, getUserComparison, getMonthlyRanking, getGuiltMetric } = require('../models/analyticsModel');

// Obtener estadisticas generales
const getDashboardGeneralStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await getGeneralStats(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching general stats', error });
    }
};

// Obtener estadisticas por categoria
const getDashboardStatsByCategory = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await getStatsByCategory(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching stats by category', error });
    }
};

// Obtener estadisticas mensuales
const getDashboardMonthlyStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await getMonthlyStats(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching monthly stats', error });
    }
};

// Estadisticas de gastos frecuentes
const getFrequentExpensesStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await getFrequentExpenses(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching frequent expenses', error });
    }
};

// Comparativa con otros usuarios
const getUserComparisonStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await getUserComparison(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user comparison', error });
    }
};

// Ranking personal mensual
const getMonthlyRankingStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await getMonthlyRanking(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching monthly ranking', error });
    }
};

// Metrica de culpabilidad

const getGuiltMetricStats = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await getGuiltMetric(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching guilt metric', error });
    }
};

module.exports = {
    getDashboardGeneralStats,
    getDashboardStatsByCategory,
    getDashboardMonthlyStats,
    getFrequentExpensesStats,
    getUserComparisonStats,
    getMonthlyRankingStats,
    getGuiltMetricStats
};