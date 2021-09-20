const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); // importation de middleware d'autentification
const msgCtrl = require('../controllers/msg');
const multer = require('../middleware/multer-config'); // importation de middleware pour le traitement des images

router.get('/', auth, msgCtrl.getAllMsg);
router.get('/media', auth, msgCtrl.getAllMedia);
router.post('/', auth, msgCtrl.createMsg);
router.post('/media', auth, multer, msgCtrl.createMedia);
// router.put('/:id', auth, multer, msgCtrl.modifyThing);
router.post('/delete', auth, msgCtrl.deleteMsg);
router.post('/deleteMedia', auth, msgCtrl.deleteMedia);


module.exports = router;