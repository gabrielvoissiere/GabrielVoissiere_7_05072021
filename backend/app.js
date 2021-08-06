require('dotenv').config();
const express = require('express') // importation de express
const mysql = require('mysql')

const helmet = require("helmet"); // importation de helmet pour sécuriser les en-tête des requette
const bodyParser = require('body-parser'); // importation de body parser

const cors = require("cors") // importation de cors pour l'origine des requettes

const stuffRoutes = require('./routes/sauce'); // importation de la routes des sauces
const userRoutes = require('./routes/user'); // importation de la routes del'utilisateur
const path = require('path'); // chemin pCour les images


const app = express() // création de l'app express

// connexion de maniere sécuriser a mongoose via le fichier .env
let db = mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
  })
  
  db.connect(function (err) {
    if (err) {
        return console.error('error: ' + err.message);
    }
    console.log('Connected to the MySQL server.');
  });

app.use(cors())

// reponse en JSON
app.use(helmet());
app.use(express.json());

// routes pour les images, sauces et utilisateur
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/sauces', stuffRoutes);

// exportation de l'app
module.exports = app