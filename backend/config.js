require('dotenv').config();

// connexion de maniere sécuriser a mongoose via le fichier .env
let database = {
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database
}

module.exports = database
