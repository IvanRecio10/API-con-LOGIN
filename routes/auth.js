const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const router = express.Router();
const users = require('../data/users');

router.get('/', (req, res) => {
  if (req.session.token) {
    return res.redirect('/search');
  }
  res.send(`
    <form method="POST" action="/">
      <input type="text" name="username" placeholder="Usuario" required />
      <input type="password" name="password" placeholder="Contraseña" required />
      <button type="submit">Iniciar Sesión</button>
    </form>
  `);
});

router.post('/', (req, res) => {
  const { username, password } = req.body;
  const user = users.find(u => u.username === username);

  if (!user) {
    return res.send('Usuario o contraseña incorrectos');
  }

  bcrypt.compare(password, user.password, (err, isMatch) => {
    if (isMatch) {
      const token = jwt.sign({ username: user.username }, 'mi-secreto', { expiresIn: '1h' });
      req.session.token = token;
      return res.redirect('/search');
    } else {
      return res.send('Usuario o contraseña incorrectos');
    }
  });
});

router.post('/logout', (req, res) => {
  req.session.destroy();
  res.redirect('/');
});

module.exports = router;
