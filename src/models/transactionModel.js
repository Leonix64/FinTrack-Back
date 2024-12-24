const { db } = require('../config/firebaseConfig');

// Agregar una transacción
const addTransaction = async (transaction) => {
    const docRef = await db.collection('transactions').add(transaction);
    return docRef.id;
};

// Obtener todas las transacciones de un usuario
const getTransactionsByUser = async (userId) => {
    const snapshot = await db.collection('transactions').where('userId', '==', userId).get();
    const transactions = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return transactions;
};

// Actualizar una transacción
const updateTransaction = async (transactionId, updatedData) => {
    await db.collection('transactions').doc(transactionId).update(updatedData);
    return true;
};

// Eliminar una transacción
const deleteTransaction = async (transactionId) => {
    await db.collection('transactions').doc(transactionId).delete();
    return true;
};

module.exports = {
    addTransaction,
    getTransactionsByUser,
    updateTransaction,
    deleteTransaction
};