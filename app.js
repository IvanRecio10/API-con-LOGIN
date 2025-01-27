const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const session = require('express-session');
const authRoutes = require('./routes/auth');
const rickAndMortyRoutes = require('./routes/rickAndMorty');
const authMiddleware = require('./middlewares/authMiddleware');

app.set('view engine', 'ejs');  
app.set('views', path.join(__dirname, 'views')); 

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(session({
  secret: 'mi-secreto',
  resave: false,
  saveUninitialized: true,
}));

app.use('/', authRoutes);
app.use('/', authMiddleware, rickAndMortyRoutes);  

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
