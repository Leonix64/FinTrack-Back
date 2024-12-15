const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { addUser, findUserByEmail } = require('../models/userModel');
const { JWT_SECRET } = require('../middlewares/authMiddleware');

// Registrar usuario
const register = async (req, res) => {
    const { name, email, password } = req.body;

    try {
        // Validar si ya existe el usuario
        const existingUser = await findUserByEmail(email);
        if (existingUser) {
            return res.status(400).json({ message: 'The email is already registered' });
        }

        // Crear usuario con la fecha actual
        const createdAt = new Date();
        const userId = await addUser({ name, email, password, createdAt });

        res.status(200).json({ message: 'User successfully registered', id: userId });
    } catch (error) {
        // Manejo de errores
        console.error('Error registering user:', error);
        res.status(500).json({ message: 'Internal server error' });
    }
};

// Iniciar sesión
const login = async (req, res) => {
    const { email, password } = req.body;

    // Buscar usuario por email
    const user = await findUserByEmail(email);
    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    // Comparar contraseña
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Incorrect password' });
    }

    const payload = {
        id: user.id,
        email: user.email,
        password: user.password,
        createdAt: user.createdAt = new Date(),
    }

    // Generar token JWT
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });
    res.json({ message: 'Login successful', token });
    console.log('Auth: ', token, 'DataUser: ', payload);
};

module.exports = {
    register,
    login
};