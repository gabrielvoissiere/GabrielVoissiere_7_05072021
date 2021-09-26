const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); // importation de middleware d'autentification
const msgCtrl = require('../controllers/msg'); // importation des controlleur des messages
const multer = require('../middleware/multer-config'); // importation de middleware pour le traitement des images

router.get('/', auth, msgCtrl.getAllMsg); // recuperer les messages
router.get('/media', auth, msgCtrl.getAllMedia); // recuperer les images
router.post('/', auth, msgCtrl.createMsg); // poster un message
router.post('/media', auth, multer, msgCtrl.createMedia); // poster une image
router.post('/delete', auth, msgCtrl.deleteMsg); // supprimer un message
router.post('/deleteMedia', auth, msgCtrl.deleteMedia); // supprimer une images

module.exports = router;