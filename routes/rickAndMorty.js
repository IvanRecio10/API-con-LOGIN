const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/search', (req, res) => {
  res.send(`
    <form method="GET" action="/character">
      <input type="text" name="name" placeholder="Nombre del personaje" required />
      <button type="submit">Buscar</button>
    </form>
    <form method="POST" action="/logout">
      <button type="submit">Logout</button>
    </form>
  `);
});

router.get('/characters', async (req, res) => {
  try {
    const response = await axios.get('https://rickandmortyapi.com/api/character');
    res.json(response.data.results);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener los personajes' });
  }
});

router.get('/character', async (req, res) => {
  const name = req.query.name;

  try {
    const response = await axios.get(`https://rickandmortyapi.com/api/character/?name=${name}`);
    if (response.data.results.length > 0) {
      const character = response.data.results[0];
      res.render('character', { character });  
    } else {
      res.send('Personaje no encontrado');
    }
  } catch (error) {
    res.send('Error al buscar el personaje');
  }
});

module.exports = router;
