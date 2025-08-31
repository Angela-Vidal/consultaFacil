const express = require('express');
const cors = require('cors');
require('dotenv').config();

const consultaRoutes = require('./routes/consultas');

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/consultas', consultaRoutes);

app.get('/', (req, res) => {
  res.send('API do Consulta Fácil está no ar!');
});

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});