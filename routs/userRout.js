const express = require('express');
const { getRegistration,postRegistration,getLogin,checkAuth,postLogin,logOut,logedIn, edit, editPost,getFaq,getEmailVer, verifyMail,postVerify,sendOtp,relatedPosts,getChangePass,changePass,deleteAcc,getforgotPass,forgotOTP,postForgotOtp,setPassword,postSetPass,getProducts,getKnowMore } = require('../controllers/userController');
const {isAuth} = require('../middlewares/auth.js');
const router = express.Router();
const multer = require('multer');
const path = require('path');


const storage = multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,path.join(__dirname,'../userImages/userImg'));
    },
    filename:function(req,file,cb){
        const name = "user.png";
        cb(null,name);
    }   
})

const upload = multer({storage:storage});

router.get('/register',getRegistration);

router.post('/register',postRegistration);

router.get('/login',getLogin); 

router.get('/',isAuth,checkAuth);

router.post('/login',postLogin);

router.get("/logOut",logOut);

router.get("/logined",logedIn);

router.get("/edit",edit);

router.post("/edit",upload.single('image'),editPost);

router.get('/faq',getFaq);

router.get('/sendOtp',sendOtp);

router.get('/relatedPosts',relatedPosts);

router.get('/verifyemail',getEmailVer);

router.post('/verify',postVerify);

router.get('/verifyemial',verifyMail);

router.get('/changepass',getChangePass);

router.post('/postChangePass',changePass);

router.post('/delAccount',deleteAcc);

router.get("/forgotPass",getforgotPass);

router.post('/forgotOTP',forgotOTP);

router.post('/postForgotOtp',postForgotOtp);

router.get('/setPass',setPassword);

router.post('/postSetPass',postSetPass);

router.get('/drySkin',getProducts);

router.get('/oilySkin',getProducts);

router.get('/sensitiveSkin',getProducts);

router.get('/allSkin',getProducts);

router.get('/knowMore',getKnowMore);

module.exports = router;