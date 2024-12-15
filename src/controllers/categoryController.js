const { addCategory, getCategoriesById, updateCategory, deleteCategory } = require('../models/categoryModel');

// Crear una nueva categoría
const createCategory = async (req, res) => {
    try {
        const userId = req.user.id; // ID del usuario autenticado
        const { name, color } = req.body;

        const categoryId = await addCategory({ userId, name, color });

        res.status(201).json({ message: 'Category created successfully', id: categoryId });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error creating category', error });
    }
};

// Obtener categorías de un usuario
const getUserCategories = async (req, res) => {
    try {
        const userId = req.user.id;
        const categories = await getCategoriesById(userId);

        res.status(200).json(categories);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error fetching categories', error });
    }
};

// Actualizar una categoría
const updateUserCategory = async (req, res) => {
    try {
        const { id } = req.params;
        const updatedData = req.body;

        await updateCategory(id, updatedData);
        res.status(200).json({ message: 'Category updated successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error updating category', error });
    }
};

// Eliminar una categoría
const deleteUserCategory = async (req, res) => {
    try {
        const { id } = req.params;

        await deleteCategory(id);
        res.status(200).json({ message: 'Category deleted successfully' });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: 'Error deleting category', error });
    }
};

module.exports = {
    createCategory,
    getUserCategories,
    updateUserCategory,
    deleteUserCategory,
};