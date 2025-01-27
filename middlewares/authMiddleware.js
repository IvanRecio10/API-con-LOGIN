const jwt = require('jsonwebtoken');

function authMiddleware(req, res, next) {
  const token = req.session.token;
  if (!token) {
    return res.redirect('/');
  }
  
  jwt.verify(token, 'mi-secreto', (err, decoded) => {
    if (err) {
      return res.redirect('/');
    }
    req.user = decoded;
    next();
  });
}

module.exports = authMiddleware;
