const contactus = require('../models/contactModel.js');

const storeContacts =  async (req,res)=>{
    const { name,email,reviews } = req.body;
    await contactus.create( {name,email,reviews} );
    res.redirect('/contact');
}


const getContact = async (req,res) => {
    res.render("Contact");
}

module.exports = {storeContacts,getContact};