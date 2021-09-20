// importation de express
const express = require('express') 
// importation de mysql
const mysql = require('mysql')
// importation des donnée de connection à la base de donnée
const database = require('./config')

// importation de helmet pour sécuriser les en-tête des requette
const helmet = require("helmet"); 
// importation de body parser
const bodyParser = require('body-parser'); 

// importation de cors pour l'origine des requettes
const cors = require("cors") 

// importation de la routes des sauces
const stuffRoutes = require('./routes/msg'); 
// importation de la routes del'utilisateur
const userRoutes = require('./routes/user');
// chemin pCour les images 
const path = require('path'); 
const { createMsg } = require('./controllers/msg');

// création de l'app express
const app = express()

// connection à la base de donnée
let connection = mysql.createConnection(database)

// connection au server mysql
connection.connect(function (err) {
  if (err) {
    return console.error('error: ' + err.message);
  } else {
    console.log('connected to mysql server !');
  }

  // creation de la table utilisateur si elle n'existe pas
  let createUsers = `create table if not exists users(
                          id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          firstname VARCHAR(100) NOT NULL,
                          lastname VARCHAR(100) NOT NULL,
                          email VARCHAR(255) NOT NULL UNIQUE,
                          password VARCHAR(255) NOT NULL,
                          role VARCHAR(255) NOT NULL
                      )`;

  connection.query(createUsers, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  // creation de la table utilisateur si elle n'existe pas
  let createMessage = `create table if not exists messages(
                          id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
                          name VARCHAR(100) NOT NULL,
                          message VARCHAR(100) NOT NULL,
                          date VARCHAR(100) NOT NULL
                      )`;

  connection.query(createMessage, function (err, results, fields) {
    if (err) {
      console.log(err.message);
    }
  });

  // creation de la table images si elle n'existe pas
  let createMedia = `create table if not exists medias(
    id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
    imageUrl VARCHAR(100) NOT NULL,
    lastname VARCHAR(100) NOT NULL
)`;

connection.query(createMedia, function (err, results, fields) {
if (err) {
console.log(err.message);
}
});

  connection.end(function (err) {
    if (err) {
      return console.log(err.message);
    }
  });
});

// application de cors
app.use(cors())

// application de helmet
app.use(helmet());
// reponse en JSON
app.use(express.json());

// routes pour les images, sauces et utilisateur
app.use('/images', express.static(path.join(__dirname, 'images')));
app.use('/api/user', userRoutes);
app.use('/api/msg', stuffRoutes);

// exportation de l'app
module.exports = app