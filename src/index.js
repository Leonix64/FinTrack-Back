const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes


const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json({ limit: '100mb', extended: true }));

app.get('/', (req, res) => {
    res.send('Hello, World!');
});


app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://localhost:${PORT}`);
});