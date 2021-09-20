const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const rateLimit = require('../middleware/rate-limit'); 
const auth = require("../middleware/auth")

router.post('/signup', userCtrl.signup); // route pour s'inscrire
router.post('/login', rateLimit, userCtrl.login); // route pour se connecter
router.post('/delete', auth, userCtrl.deleteUser); // route pour supprimer un profils

module.exports = router;