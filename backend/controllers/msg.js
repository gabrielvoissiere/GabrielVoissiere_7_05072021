/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const express = require('express');
const fs = require('fs');
// importation de multer
const multer  = require('multer')

// importation de mysql
const mysql = require('mysql')

// importation des donnée de connection à la base de donnée
const database = require('../config')

// connexion a la BDD
let connection = mysql.createConnection(database);

// recuperer tous les messages
exports.getAllMsg = (req, res, next) => {
    let getMsg = `SELECT * FROM messages`;
    connection.query(getMsg, (error, results, fields) => {
        res.status(200).json(results)
    })
}

// recupere tout les medias (images)
exports.getAllMedia = (req, res, next) => {
    let getMsg = `SELECT * FROM medias`;
    connection.query(getMsg, (error, results, fields) => {
        res.status(200).json(results)
    })
}

// crée un nouveau message
exports.createMsg = (req, res, next) => {
    if (req.body == undefined) {
        console.log("vide");
    } else {
        let postMessage = `INSERT INTO messages(name,message,date) 
    VALUES("${req.body.name}","${req.body.msg}","${req.body.date}")`;
        connection.query(postMessage);
        console.log('message posté !');
        res.status(201).json({
            message: "message posté !"
        });
    }
}

// ajouter une photo
exports.createMedia = (req, res, next) => {
    // enregistre les image dans la bdd
    `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // let mediaPath = req.protocol+"//"+req.get('host')+"/images/"+req.file.filename

    let postMessage = `INSERT INTO medias(imageUrl,lastname) 
    VALUES("${req.file.filename}","${req.body.lastname}")`;
        connection.query(postMessage);
        console.log('media posté !');
        res.status(201).json({
            message: "media posté !"
        });
}

// supprimer un message (admon seulement)
exports.deleteMsg = (req, res, next) => {
    let delMsg = `DELETE FROM messages WHERE id=${req.body.id}`;
    connection.query(delMsg, (error, results, fields) => {
        console.log('msg supprimer !');
        res.status(200).json({ message: "msg supprimer !"})
    })
};

// supprimer une image (admin seulement)
exports.deleteMedia = (req, res, next) => {
    let getMedia = `SELECT imageUrl FROM medias WHERE id=${req.body.id}`
    connection.query(getMedia, (error, results, fields) => {
        fs.unlink(`../src/assets/images/${results[0].imageUrl}`, (err => {
            if (err) console.log(err)
        }))
    })
    let delMedia = `DELETE FROM medias WHERE id=${req.body.id}`;
    connection.query(delMedia, (error, results, fields) => {
        console.log('media supprimer !');
        res.status(200).json({ message: "media supprimer !"})
    })
};