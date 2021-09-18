const express = require('express');
const router = express.Router();

const userCtrl = require('../controllers/user');
const rateLimit = require('../middleware/rate-limit'); // importation de rate-limite pour limiter le nombre de requettes

router.post('/signup', userCtrl.signup); // route pour s'inscrire
router.post('/login', userCtrl.login); // route pour se connecter
router.post('/delete', userCtrl.deleteUser); // route pour supprimer un profils

module.exports = router;