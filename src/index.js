const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Importar rutas
const { authenticateToken } = require('./middlewares/authMiddleware');
const authRoutes = require('./routes/authRoutes');

// Inicializar la app
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '100mb', extended: true }));

// Rutas
app.get('/test', (req, res) => {
    res.send('Welcome to the Finance API!');
});

app.use('/api/auth', authRoutes);

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});