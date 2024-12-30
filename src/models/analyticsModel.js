const { db } = require('../config/firebaseConfig');

// Obtener estadisticas generales de transacciones
const getGeneralStats = async (userId) => {
    const snapshot = await db.collection('transactions').where('userId', '==', userId).get();
    const totalTransactions = snapshot.size;
    const totalAmount = snapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
    return { totalTransactions, totalAmount };
};

// Obtener estadisticas por categoria
const getStatsByCategory = async (userId) => {
    const snapshot = await db.collection('transactions').where('userId', '==', userId).get();
    const stats = {};

    snapshot.forEach(doc => {
        const { categoryId, amount } = doc.data();
        if (!stats[categoryId]) {
            stats[categoryId] = { count: 0, total: 0 };
        }
        stats[categoryId].count++;
        stats[categoryId].total += amount;
    });

    return stats;
};

// Obtener estadisticas por mes
const getMonthlyStats = async (userId) => {
    const snapshot = await db.collection('transactions')
        .where('userId', '==', userId)
        //.orderBy('date', 'desc')
        .get();

    const stats = {};

    snapshot.docs.forEach(doc => {
        const { date, amount } = doc.data();
        const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });

        if (!stats[month]) {
            stats[month] = { count: 0, total: 0 };
        }
        stats[month].count++;
        stats[month].total += amount;
    });

    return stats;
};

// Identificar la categoria mas gastada y transacciones frecuentes
const getFrequentExpenses = async (userId) => {
    const snapshot = await db.collection('transactions').where('userId', '==', userId).get();
    const categoryTotals = {};
    const transactionCounts = {};

    snapshot.docs.forEach(doc => {
        const { categoryId, description, amount } = doc.data();

        // Categorias
        if (!categoryTotals[categoryId]) categoryTotals[categoryId] = 0;
        categoryTotals[categoryId] += amount;

        // Transacciones frecuentes
        if (!transactionCounts[description]) transactionCounts[description] = 0;
        transactionCounts[description]++;
    });

    const mostSpentCategory = Object.keys(categoryTotals).reduce((a, b) => categoryTotals[a] > categoryTotals[b] ? a : b);

    const mostFrequentTransaction = Object.keys(transactionCounts).reduce((a, b) => transactionCounts[a] > transactionCounts[b] ? a : b);

    return { mostSpentCategory, mostFrequentTransaction };
};

// Comparativa con otros usuarios
const getUserComparison = async (userId) => {
    const allSnapshots = await db.collection('transactions').get();
    const userSnapshot = await db.collection('transactions').where('userId', '==', userId).get();

    const userTotal = userSnapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
    const allUsersTotal = allSnapshots.docs.reduce((totals, doc) => {
        const { userId: id, amount } = doc.data();
        if (!totals[id]) totals[id] = 0;
        totals[id] += amount;
        return totals;
    }, {});

    const rank = Object.values(allUsersTotal).filter(total => total <= userTotal).length;
    const percentile = Math.round((rank / Object.keys(allUsersTotal).length) * 100);

    return { rank, percentile };
};

// Ranking personal mensual
const getMonthlyRanking = async (userId) => {
    const snapshot = await db.collection('transactions').where('userId', '==', userId).get();
    const monthlyStats = {};

    snapshot.docs.forEach(doc => {
        const { date, amount } = doc.data();
        const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });

        if (!monthlyStats[month]) monthlyStats[month] = { total: 0, count: 0 };
        monthlyStats[month].total += amount;
        monthlyStats[month].count++;
    });

    return monthlyStats;
};

// Metrica de "culpabilidad" o un intento de ello xD
const getGuiltMetric = async (userId) => {
    const snapshot = await db.collection('transactions').where('userId', '==', userId).get();
    const impulsiveCount = snapshot.docs.filter(doc => doc.data().isImpulsive).length;
    const totalTransactions = snapshot.size;

    const guiltPercentage = totalTransactions > 0 ? Math.round((impulsiveCount / totalTransactions) * 100) : 0;

    return { impulsiveCount, guiltPercentage };
};

module.exports = {
    getGeneralStats,
    getStatsByCategory,
    getMonthlyStats,
    getFrequentExpenses,
    getUserComparison,
    getMonthlyRanking,
    getGuiltMetric
};