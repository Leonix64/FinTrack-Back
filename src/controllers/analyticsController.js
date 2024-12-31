const { fetchGeneralTransactionSummary, analyzeCategoryBreakdown, computeMonthlyInsights, identifySpendingPatterns, compareUserSpending, generateMonthlyRanking, calculateImpulsiveSpending, evaluateCategoryDiversity } = require('../models/analyticsModel');

// Obtener resumen general de transacciones
const fetchGeneralStatsHandler = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await fetchGeneralTransactionSummary(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching general stats', error });
    }
};

// Analizar desglose por categoría
const analyzeCategoryStatsHandler = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await analyzeCategoryBreakdown(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching stats by category', error });
    }
};

// Calcular estadísticas mensuales
const computeMonthlyStatsHandler = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await computeMonthlyInsights(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching monthly stats', error });
    }
};

// Identificar patrones de gasto
const identifySpendingPatternsHandler = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await identifySpendingPatterns(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching frequent expenses', error });
    }
};

// Comparar gasto del usuario
const compareUserSpendingHandler = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await compareUserSpending(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching user comparison', error });
    }
};

// Generar ranking mensual
const generateMonthlyRankingHandler = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await generateMonthlyRanking(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching monthly ranking', error });
    }
};

// Calcular métrica de impulsividad
const calculateImpulsiveSpendingHandler = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await calculateImpulsiveSpending(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching guilt metric', error });
    }
};

// Evaluar diversidad de categorías
const evaluateCategoryDiversityHandler = async (req, res) => {
    try {
        const userId = req.user.id;
        const stats = await evaluateCategoryDiversity(userId);
        res.status(200).json(stats);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching category diversity', error });
    }
};

module.exports = {
    fetchGeneralStatsHandler,
    analyzeCategoryStatsHandler,
    computeMonthlyStatsHandler,
    identifySpendingPatternsHandler,
    compareUserSpendingHandler,
    generateMonthlyRankingHandler,
    calculateImpulsiveSpendingHandler,
    evaluateCategoryDiversityHandler
};
