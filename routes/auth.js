const express = require('express');
const router = express.Router();
const User = require('../models/User');

// Rota para registrar usuário
router.post('/register', async (req, res) => {
  const { name, email, password } = req.body;

  try {
    // Verifica se o email já está registrado
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'Usuário já registrado' });
    }

    // Cria um novo usuário
    user = await User.create({ name, email, password });

    res.status(201).json({ msg: 'Usuário registrado com sucesso' });
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Erro no servidor');
  }
});

module.exports = router;
