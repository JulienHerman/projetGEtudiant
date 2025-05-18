
const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];
  
  if (!token) return res.sendStatus(401);
  
  jwt.verify(token, process.env.JWT_SECRET || '12345', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user; // Ajoute les infos utilisateur à la requête
    next();
  });
}

module.exports = authenticateToken;