const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const authRoutes = require('./routes/auth');
const sequelize = require('./config/sequelize');

dotenv.config();

const app = express();

// Habilitando o CORS para permitir requisições de qualquer origem
app.use(cors({
  origin: 'http://localhost:4200'
}));

// Middleware para interpretar JSON
app.use(express.json());

// Conecta ao MySQL
sequelize.sync()
  .then(() => console.log('MySQL conectado e sincronizado...'))
  .catch((err) => console.error(err));

// Configura a rota de autenticação
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
