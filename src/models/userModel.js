const { db } = require('../config/firebaseConfig');
const bcrypt = require('bcryptjs');

// Registrar un usuario
const addUser = async (user) => {
    const hashedPassword = await bcrypt.hash(user.password, 10); // Encripta la password
    const docRef = await db.collection('users').add({ ...user, password: hashedPassword });
    return docRef.id;
};

// Buscar usuario por email
const findUserByEmail = async (email) => {
    const snapshot = await db.collection('users').where('email', '==', email).get();
    if (snapshot.empty) return null;
    const doc = snapshot.docs[0];
    return { id: doc.id, ...doc.data() };
};

module.exports = { addUser, findUserByEmail };