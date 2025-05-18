const express = require('express');
const router = express.Router();
const userService = require('../services/UserServices');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

// Create user
router.post('/register', async (req, res) => {
  try {
    const user = await userService.create(req.body);
    console.log(res.status);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await userService.findAll();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Get user by ID
router.get('/:id', async (req, res) => {
  try {
    const user = await userService.findById(req.params.id);
    if (!user) return res.status(404).json({ error: 'User not found' });
    res.json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Update user
router.put('/:id', async (req, res) => {
  try {
    const user = await userService.update(req.params.id, req.body);
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Delete user
router.delete('/:id', async (req, res) => {
  try {
    await userService.delete(req.params.id);
    res.json({ message: 'User successfully deleted' });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    
    const utilisateur = await userService.findByEmail(email);
    if (!utilisateur) {
      return res.status(401).json({ erreur: 'Email ou mot de passe incorrect' });
    }
    
    const passwordMatch = await bcrypt.compare(password, utilisateur.password);
    if (!passwordMatch) {
      return res.status(401).json({ erreur: 'Email ou mot de passe incorrect' });
    }
    
    const token = jwt.sign(
      { 
        id: utilisateur.id,
        email: utilisateur.email,
        role: utilisateur.role 
      },
      process.env.JWT_SECRET || '12345',
      { expiresIn: '24h' }
    );
    
    // 4. Renvoyer la réponse avec le token
    res.json({
      access_token:token,
      token_type:"Bearer",
      user: {
        id: utilisateur.id,
        name: utilisateur.name,
        surname: utilisateur.surname,
        email: utilisateur.email,
        role: utilisateur.role,
        status: utilisateur.status,
        created_at: utilisateur.created_at,
        updated_at: utilisateur.updated_at
      }
    });
    
  } catch (error) {
    res.status(500).json({ erreur: error.message });
  }
});

module.exports = router;
