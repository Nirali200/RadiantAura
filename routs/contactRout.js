const express = require('express');
const { storeContacts,getContact } = require('../controllers/contactController.js'); 
const router = express.Router();

router.get("/contact",getContact);
router.post('/contact',storeContacts);

module.exports = router;