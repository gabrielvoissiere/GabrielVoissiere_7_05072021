/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

const Msg = require('../models/sauce');
const express = require('express');
const fs = require('fs');
// importation de mysql
const mysql = require('mysql')
// importation des donnée de connection à la base de donnée
const database = require('../config')
// connexion a la BDD
let connection = mysql.createConnection(database);

// // récupere toutes les sauces
// exports.getAllMsg = (req, res, next) => {
//     Msg.find()
//         .then(things => res.status(200).json(things))
//         .catch(error => res.status(400).json({
//             error
//         }));
// }

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
    // const sauceObject = JSON.parse(req.body.sauce);
    // delete sauceObject._id;
    // const sauce = new Msg({
    //     ...sauceObject,
    //     imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    // });
    // sauce.save()
    //     .then(() => res.status(201).json({
    //         message: 'Objet enregistré !'
    //     }))
    //     .catch(error => res.status(400).json({
    //         error
    //     }));

    if (req.body == undefined) {
        console.log("vide");
    } else {
        let postMessage = `INSERT INTO messages(name,message) 
    VALUES('${req.body.name}','${req.body.msg}')`;
        connection.query(postMessage);
        console.log('message posté !');
        res.status(201).json({
            message: "message posté !"
        });
    }
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

// // systeme de like et dislike
// exports.likeDislikeMsg = (req, res, next) => {
//     const like = req.body.like;
//     const userId = req.body.userId;
//     const sauceId = req.params.id;

//     switch (like) {
//         case 1:
//             Msg.updateOne({
//                     _id: sauceId
//                 }, {
//                     $inc: {
//                         likes: 1
//                     },
//                     $push: {
//                         usersLiked: userId
//                     }
//                 })
//                 .then(() => res.status(200).json({
//                     message: 'Msg likée !'
//                 }))
//                 .catch(error => res.status(400).json({
//                     error
//                 }));
//             break;
//         case 0:
//             Msg.findOne({
//                     _id: sauceId
//                 })
//                 .then(sauce => {
//                     const likesOrDislikes = {};
//                     const usersLikedOrDisliked = {};
//                     if (sauce.usersLiked.includes(userId)) {
//                         likesOrDislikes.likes = -1;
//                         usersLikedOrDisliked.usersLiked = userId;
//                     } else if (sauce.usersDisliked.includes(userId)) {
//                         likesOrDislikes.dislikes = -1;
//                         usersLikedOrDisliked.usersDisliked = userId;
//                     }
//                     Msg.updateOne({
//                             _id: sauceId
//                         }, {
//                             $inc: likesOrDislikes,
//                             $pull: usersLikedOrDisliked
//                         })
//                         .then(() => res.status(200).json({
//                             message: 'Modifé !'
//                         }))
//                         .catch(error => res.status(400).json({
//                             error
//                         }));
//                 })
//                 .catch(error => res.status(500).json({
//                     error
//                 }));

//             break;
//         case -1:
//             Msg.updateOne({
//                     _id: sauceId
//                 }, {
//                     $inc: {
//                         dislikes: 1
//                     },
//                     $push: {
//                         usersDisliked: userId
//                     }
//                 })
//                 .then(() => res.status(200).json({
//                     message: 'Msg dislikée !'
//                 }))
//                 .catch(error => res.status(400).json({
//                     error
//                 }));
//             break;
//     }
// }