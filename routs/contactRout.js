const express = require('express');
const { storeContacts,getContact, checkAuth } = require('../controllers/contactController.js'); 
const { isAuthCon } = require('../middlewares/auth.js');
const router = express.Router();

router.get("/contact",isAuthCon,checkAuth);
router.post('/contact',storeContacts);

module.exports = router;