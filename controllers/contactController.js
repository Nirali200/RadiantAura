const contactus = require('../models/contactModel.js');

const storeContacts =  async (req,res)=>{
    const { name,email,reviews } = req.body;
    await contactus.create( {name,email,reviews} );
    res.redirect('/contact');
}

const checkAuth = (req,res) => {
    let profile = true;
    res.render("Contact.ejs",{profile});
}



module.exports = {storeContacts,checkAuth};