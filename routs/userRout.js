const express = require('express');
const {getRegistration,postRegistration,getLogin,isAuth,checkAuth,postLogin,logOut} = require('../controllers/userController');
const router = express.Router();

router.get('/register',getRegistration);
router.post('/register',postRegistration);

router.get('/login',getLogin);

const isAuthenticat = isAuth;
router.get('/',isAuthenticat,checkAuth);

router.post('/login',postLogin);

router.get("/logOut",logOut);

module.exports = router;