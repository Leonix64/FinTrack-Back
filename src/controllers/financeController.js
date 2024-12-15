const { addTransaction, getTransactionsByUser, updateTransaction, deleteTransaction } = require('../models/transactionModel');

// Crear una nueva transacción
const createTransaction = async (req, res) => {
    try {
        const userId = req.user.id; // Viene del middleware de autentificacion
        const { amount, description, categoryId, date } = req.body;

        const transactionId = await addTransaction({
            userId,
            amount,
            description,
            categoryId,
            date: date || new Date().toISOString(),
        });

        res.status(201).json({ message: 'Transaction created successfully', id: transactionId });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error creating transaction', error });
    }
};

// Obtener todas las transacciones del usuario
const getUserTransactions = async (req, res) => {
    try {
        const userId = req.user.id;
        const transactions = await getTransactionsByUser(userId);

        res.status(200).json(transactions);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error fetching transactions', error });
    }
};

// Actualizar una transacción
const updateUserTransaction = async (req, res) => {
    try {
        const { id } = req.params; // ID de la transacción
        const updatedData = req.body;

        await updateTransaction(id, updatedData);
        res.status(200).json({ message: 'Transaction updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error updating transaction', error });
    }
};

// Eliminar una transacción
const deleteUserTransaction = async (req, res) => {
    try {
        const { id } = req.params; // ID de la transacción

        await deleteTransaction(id);
        res.status(200).json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting transaction', error });
    }
};

module.exports = {
    createTransaction,
    getUserTransactions,
    updateUserTransaction,
    deleteUserTransaction,
};