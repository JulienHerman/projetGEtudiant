// routes/user.routes.js
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

router.post('/users', async (req, res) => {
  try {
    const { name, surname, email, password, role } = req.body;

    const existing = await User.findOne({ where: { email } });
    if (existing) {
      return res.status(400).json({ message: "Cet email est déjà utilisé." });
    }

    const newUser = await User.create({ name, surname, email, password, role });
    res.status(201).json({ message: "Utilisateur créé", user: newUser });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Erreur serveur", error: err.message });
  }
});

module.exports = router;
