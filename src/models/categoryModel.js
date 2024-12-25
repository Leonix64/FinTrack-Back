const { db } = require('../config/firebaseConfig');

// Agregar una categoria
const addCategory = async (category) => {
    const docRef = await db.collection('categories').add(category);
    return docRef.id;
};

// Obtener todas las categorias de un usuario
const getCategoriesById = async (userId) => {
    const snapshot = await db.collection('categories').where('userId', '==', userId).get();
    const categories = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return categories;
};

// Actualizar una categoria
const updateCategory = async (categoryId, updatedData) => {

    delete updatedData.id;

    await db.collection('categories').doc(categoryId).set(updatedData, { merge: true });
    return true;
};

// Eliminar una categoria
const deleteCategory = async (categoryId) => {
    await db.collection('categories').doc(categoryId).delete();
    return true;
};

module.exports = {
    addCategory,
    getCategoriesById,
    updateCategory,
    deleteCategory,
}