/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const Msg = require('../models/sauce');
const express = require('express');
const fs = require('fs');

// const multer = require('../middleware/multer-config');
const multer  = require('multer')
const upload = multer({dest: './images/'})

// importation de mysql
const mysql = require('mysql')
// importation des donnée de connection à la base de donnée
const database = require('../config')
// connexion a la BDD
let connection = mysql.createConnection(database);

// récupere toutes les sauces
exports.getAllMsg = (req, res, next) => {
    Msg.find()
        .then(things => res.status(200).json(things))
        .catch(error => res.status(400).json({
            error
        }));
}

exports.getAllMsg = (req, res, next) => {
    let getMsg = `SELECT * FROM messages`;
    connection.query(getMsg, (error, results, fields) => {
        res.status(200).json(results)
    })
}
// // récupere la sauce demander
// exports.getOneMsg = (req, res, next) => {
//     Msg.findOne({
//             _id: req.params.id
//         })
//         .then(thing => res.status(200).json(thing))
//         .catch(error => res.status(404).json({
//             error
//         }));
// }

// crée une nouvelle sauce
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

// crée une nouvelle sauce
exports.createMedia = (req, res, next) => {
    
    upload.single('uploaded_file')

    // let postMessage = `INSERT INTO medias(imageUrl) 
    // VALUES("${req.body.name}")`;
    //     connection.query(postMessage);
    //     console.log('media posté !');
    //     res.status(201).json({
    //         message: "media posté !"
    //     });

    // console.log(imageUrl);
}
// // modifier une sauce
// exports.modifyThing = (req, res, next) => {
//     const sauceObject = req.file ? {
//         ...JSON.parse(req.body.thing),
//         imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
//     } : {
//         ...req.body
//     };
//     Msg.updateOne({
//             _id: req.params.id
//         }, {
//             ...sauceObject,
//             _id: req.params.id
//         })
//         .then(() => res.status(200).json({
//             message: 'Objet modifié !'
//         }))
//         .catch(error => res.status(400).json({
//             error
//         }));
// };

// // supprimer une sauce
// exports.deleteMsg = (req, res, next) => {
//     Msg.findOne({
//             _id: req.params.id
//         })
//         .then(thing => {
//             const filename = thing.imageUrl.split('/images/')[1];
//             fs.unlink(`images/${filename}`, () => {
//                 Msg.deleteOne({
//                         _id: req.params.id
//                     })
//                     .then(() => res.status(200).json({
//                         message: 'Objet supprimé !'
//                     }))
//                     .catch(error => res.status(400).json({
//                         error
//                     }));
//             });
//         })
//         .catch(error => res.status(500).json({
//             error
//         }));
// };

