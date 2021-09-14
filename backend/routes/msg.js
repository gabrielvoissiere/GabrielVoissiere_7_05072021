const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth'); // importation de middleware d'autentification
const msgCtrl = require('../controllers/msg');
const multer = require('../middleware/multer-config'); // importation de middleware pour le traitement des images

router.get('/', msgCtrl.getAllMsg);
// router.get('/:id', auth, msgCtrl.getOneMsg);
router.post('/', msgCtrl.createMsg);
router.post('/media', multer, msgCtrl.createMedia);
// router.put('/:id', auth, multer, msgCtrl.modifyThing);
// router.delete('/:id', auth, msgCtrl.deleteMsg);


module.exports = router;