const { db } = require('../config/firebaseConfig');

// Resumen general de transacciones
const fetchGeneralTransactionSummary = async (userId) => {
    const snapshot = await db.collection('transactions').where('userId', '==', userId).get();
    const totalTransactions = snapshot.size;

    const totalAmount = snapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
    const averangeTransaction = totalTransactions > 0 ? totalAmount / totalTransactions : 0;

    return {
        totalTransactions,
        totalAmount,
        averageTransaction: parseFloat(averangeTransaction.toFixed(2))
    };
};

// Analisis detallado por categoria
const analyzeCategoryBreakdown = async (userId) => {
    const [categorySnapshot, transactionSnapshot] = await Promise.all([
        db.collection('categories').where('userId', '==', userId).get(),
        db.collection('transactions').where('userId', '==', userId).get()
    ]);

    const categories = categorySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    const transactions = transactionSnapshot.docs.map(doc => doc.data());

    const stats = categories.map(category => {
        const categoryTransactions = transactions.filter(t => t.categoryId === category.id);
        const total = categoryTransactions.reduce((sum, t) => sum + t.amount, 0);
        const average = categoryTransactions.length > 0 ? total / categoryTransactions.length : 0;

        return {
            name: category.name,
            color: category.color,
            count: categoryTransactions.length,
            total,
            average: parseFloat(average.toFixed(2))
        };
    });

    return stats.sort((a, b) => b.total - a.total); // Ordena por total gastado
};

// Estadisticas mensuales agrupadas
const computeMonthlyInsights = async (userId) => {
    const snapshot = await db.collection('transactions').where('userId', '==', userId).get();

    const stats = snapshot.docs.reduce((acc, doc) => {
        const { date, amount } = doc.data();
        const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });

        if (!acc[month]) {
            acc[month] = { count: 0, total: 0, average: 0 };
        }
        acc[month].count++;
        acc[month].total += amount;
        acc[month].average = parseFloat((acc[month].total / acc[month].count).toFixed(2));

        return acc;
    }, {});

    return stats;
};

// Identificar patrones clave de gastos
const identifySpendingPatterns = async (userId) => {
    const snapshot = await db.collection('transactions').where('userId', '==', userId).get();

    const categoryTotals = {};
    const transactionPatterns = {};

    snapshot.docs.forEach(doc => {
        const { categoryId, description, amount } = doc.data();

        // Categorias
        categoryTotals[categoryId] = (categoryTotals[categoryId] || 0) + amount;

        // Patrones frecuentes
        transactionPatterns[description] = (transactionPatterns[description] || 0) + 1;
    });

    const mostSpentCategory = Object.entries(categoryTotals).reduce((max, current) => current[1] > max[1] ? current : max, ['', 0]);

    const mostFrequentTransaction = Object.entries(transactionPatterns).reduce((max, current) => current[1] > max[1] ? current : max, ['', 0]);

    return {
        mostSpentCategory: { id: mostSpentCategory[0], amount: mostSpentCategory[1] },
        mostFrequentTransaction: { description: mostFrequentTransaction[0], count: mostFrequentTransaction[1] }
    };
};

// Comparativa de gasto con la comunidad
const compareUserSpending = async (userId) => {
    const [allSnapshots, userSnapshot] = await Promise.all([
        db.collection('transactions').get(),
        db.collection('transactions').where('userId', '==', userId).get()
    ]);

    const userTotal = userSnapshot.docs.reduce((sum, doc) => sum + doc.data().amount, 0);
    const allUserTotal = allSnapshots.docs.reduce((acc, doc) => {
        const { userId: id, amount } = doc.data();
        acc[id] = (acc[id] || 0) + amount;
        return acc;
    }, {});

    const sortedTotals = Object.values(allUserTotal).sort((a, b) => a - b);
    const rank = sortedTotals.filter(total => total <= userTotal).length;
    const percentile = Math.round((rank / sortedTotals.length) * 100);

    const average = sortedTotals.reduce((a, b) => a + b, 0) / sortedTotals.length;
    const deviation = parseFloat((userTotal - average).toFixed(2));

    return { userTotal, percentile, average, deviation };
};

// Ranking mensual personalizado
const generateMonthlyRanking = async (userId) => {
    const allSnapshots = await db.collection('transactions').get();

    const monthlyStats = allSnapshots.docs.reduce((acc, doc) => {
        const { date, amount, userId: transactionUserId } = doc.data();
        const month = new Date(date).toLocaleString('default', { month: 'short', year: 'numeric' });

        if (!acc[month]) {
            acc[month] = { totalSpent: 0, userSpending: {} };
        }

        acc[month].totalSpent += amount;
        acc[month].userSpending[transactionUserId] = (acc[month].userSpending[transactionUserId] || 0) + amount;

        return acc;
    }, {});

    const userMonthlyRanking = Object.entries(monthlyStats).reduce((result, [month, data]) => {
        const ranking = Object.entries(data.userSpending)
            .sort(([, a], [, b]) => b - a)
            .map(([id, total]) => ({ userId: id, total }));

        const userTotal = data.userSpending[userId] || 0;
        const userRank = ranking.findIndex(entry => entry.userId === userId) + 1;

        result[month] = {
            userTotal,
            userRank,
            totalSpentInMonth: data.totalSpent,
            ranking
        };

        return result;
    }, {});

    return userMonthlyRanking;
};

// Metrica de gasto impulsivo
const calculateImpulsiveSpending = async (userId) => {
    const snapshot = await db.collection('transactions').where('userId', '==', userId).get();

    const impulsiveCount = snapshot.docs.filter(doc => doc.data().isImpulsive).length;
    const totalTransactions = snapshot.size;

    const guiltPercentage = totalTransactions > 0 ? Math.round((impulsiveCount / totalTransactions) * 100) : 0;
    const nonImpulsiveCount = totalTransactions - impulsiveCount;

    return { impulsiveCount, nonImpulsiveCount, guiltPercentage };
};

// Diversidad de categorias exploradas
const evaluateCategoryDiversity = async (userId) => {
    const [categorySnapshot, transactionSnapshot] = await Promise.all([
        db.collection('categories').where('userId', '==', userId).get(),
        db.collection('transactions').where('userId', '==', userId).get()
    ]);

    const usedCategoryIds = new Set(transactionSnapshot.docs.map(doc => doc.data().categoryId));
    const totalCategories = categorySnapshot.size;
    const usedCategories = usedCategoryIds.size;

    const diversityPercentage = totalCategories > 0 ? Math.round((usedCategories / totalCategories) * 100) : 0;

    return {
        usedCategories,
        totalCategories,
        diversityPercentage,
        unusedCategories: totalCategories - usedCategories
    };
};

module.exports = {
    fetchGeneralTransactionSummary,
    analyzeCategoryBreakdown,
    computeMonthlyInsights,
    identifySpendingPatterns,
    compareUserSpending,
    generateMonthlyRanking,
    calculateImpulsiveSpending,
    evaluateCategoryDiversity
};
