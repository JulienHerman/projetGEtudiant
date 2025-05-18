const express = require('express');
const bodyParser = require('body-parser');
const { Model } = require('objection');
const knexConfig = require('./config/knexfile');
const knex = require('knex');
const cors = require('cors');
const app = express();
const PORT = process.env.PORT || 3002;

// Initialisation de Knex avec gestion d'erreur
let knexInstance;
try {
  knexInstance = knex(knexConfig.development);
  Model.knex(knexInstance);
  
  // Vérification de la connexion
  knexInstance.raw('SELECT 1')
    .then(() => console.log('Connexion à la base de données réussie'))
    .catch(err => {
      console.error('Erreur de connexion à la base de données:', err);
      process.exit(1);
    });
} catch (err) {
  console.error('Erreur lors de l\'initialisation de Knex:', err);
  process.exit(1);
}

// Middlewares
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

// Routes
app.use('/api/users', require('./controllers/UserController'));
app.use('/api/students', require('./controllers/StudentController'));

// Gestion des erreurs
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Quelque chose s\'est mal passé!');
});

// Démarrage du serveur
const server = app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur http://localhost:${PORT}`);
});

// Nettoyage à l'arrêt
process.on('SIGTERM', () => {
  server.close(() => {
    knexInstance.destroy().then(() => {
      console.log('Serveur et connexion DB fermés');
      process.exit(0);
    });
  });
});