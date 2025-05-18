function checkRole(requiredRoles) {
    return (req, res, next) => {
        
      if (!req.user) {
        return res.status(401).json({ erreur: 'Non authentifié' });
      }
      
      
      if (!requiredRoles.includes(req.user.role)) {
        return res.status(403).json({ erreur: 'Accès interdit - Rôle insuffisant' });
      }
      
      next();
    };
  }
  
  module.exports = checkRole;