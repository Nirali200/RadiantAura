const express = require('express');
const { getRegistration,postRegistration,getLogin,checkAuth,postLogin,logOut, logedIn } = require('../controllers/userController');
const isAuth = require('../middlewares/auth.js');
const router = express.Router();

router.get('/register',getRegistration);
router.post('/register',postRegistration);

router.get('/login',getLogin); 

router.get('/login/check',isAuth,checkAuth);

router.post('/login',postLogin);

router.get("/logOut",logOut);

router.get("/logined",logedIn);

module.exports = router;