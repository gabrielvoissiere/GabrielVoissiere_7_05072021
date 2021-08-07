// importation du modèle
const User = require('../models/User');
// Package de cryptage pour le mot de passe
const bcrypt = require('bcrypt');
//Package de création et de vérification des token
const jwt = require('jsonwebtoken');
// importation de mysql
const mysql = require('mysql')
// importation des donnée de connection à la base de donnée
const database = require('../config')
// connexion a la BDD
let connection = mysql.createConnection(database);

// validation du mdp
const passwordValidator = require('password-validator');
let schemaPasswordValidator = new passwordValidator();
schemaPasswordValidator // 8 caractères minimum et 50 caractères maximum, avec des letre en majuscule, minuscule, et un chiffre
  .is().min(8)
  .is().max(50)
  .has().uppercase()
  .has().lowercase()
  .has().digits(1)
  .has().not().spaces()
  .is().not().oneOf(['Passw0rd', 'Password123']); // valeur interdite

exports.signup = (req, res, next) => {
  // console.log("dans signup");

  // verification de la conformiter du mot de passe
  if (schemaPasswordValidator.validate(req.body.password) == true) {
    // cryptage du mot de passe avec salage x10
    bcrypt.hash(req.body.password, 10)
      .then(encryptedPassword => {
        // masque le mail
        let email = maskEmail(req.body.email)
        // ajout de l'utilisateur dans la BDD via SQL
        let sql = `INSERT INTO users(firstname,lastname,email,password) 
        VALUES('${req.body.firstName}','${req.body.lastName}','${email}','${encryptedPassword}')`;
        connection.query(sql);

        console.log('utilisateur crée !');
      })
      .catch(error => res.status(501).json({
        message: error.message
      }));
  } else {

    res.status(403).send({
      error: 'mot de passe invalide'
    });
  }
}

// connexion de l’utilisateur
exports.login = (req, res, next) => {
  // console.log('dans signup');

  // mask le mail
  let email = maskEmail(req.body.email)
  // selectionne l'id qui correspond au mail
  let sql = `SELECT id FROM users WHERE email=?`;
  connection.query(sql, email, (error, results, fields) => {
    // verifie l'existence de l'utilisateur
    if (results[0] == undefined) {
      console.log('utilisateur introuvable !');
    } else {
      console.log('utilisateur trouver !');
      let userid = results[0].id
      // selectionne le mot de passe de l'utilisateur dans la BDD
      let verifsql = `SELECT password FROM users WHERE email=?`;

      // verification de la conformiter du mot de passe
      connection.query(verifsql, email, (error, results, fields) => {
        // console.log(results[0].password);
        bcrypt.compare(req.body.password, results[0].password) // compare le mdp envoyé par l'utilisateur avec le mot de passe de la bdd
          .then(valid => { // test si comparaison est valable ou non
            if (!valid) {
              console.log('mot de passe invalide !');
              return res.status(401).json({
                error: 'Mot de passe incorrect !'
              });
            } else {
              console.log('mot de passe valide !');
            }
            // creation du token de protection valide 24h
            res.status(200).json({
              userId: userid,
              token: jwt.sign( //fonction de jsonwebtoken avec comme arguments :
                {
                  userId: userid
                }, // les données que l’on veut encoder dont l'userId
                'RANDOM_TOKEN_SECRET', {
                  expiresIn: '24h'
                } // configuration du délai d’expiration du token
              ),
              email: maskEmail(req.body.email)
            });
          })
          .catch(error => res.status(500).json({
            error
          }));
      });
    }
  })

  // fonction qui masque le mail
  function maskEmail(email) {
    const splited = email.split('@');
    const leftMail = replaceWithStars(splited[0]);
    const rightMail = replaceWithStars(splited[1]);
    return `${leftMail}@${rightMail}`;
  }

  // fonction qui remplace les caratere par des "*"
  function replaceWithStars(str) {
    let newStr = '';
    for (let i = 0; i < str.length; i++) {
      if (i < str.length / 2) {
        newStr += '*'
      } else {
        newStr += str[i]
      }
    }
    return newStr;
  }
}