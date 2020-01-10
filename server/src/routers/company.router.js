const express = require('express');
const router = express.Router();
const Company = require('../../models/models').Company;

// company utils

//get all companies in the db
router.get('/', async (req, res, next) => {
    try{
    let companies = await Company.find({});
    res.status(200).send(companies);
    }
    catch(err){
        next(err);
    }
    
});

//add a company to the db
router.post('/new', async(req, res) => {

    var comp = new Company({
        name : req.body.name,
        url : req.body.url,
    });
    comp.save(function(err){
        if(err) next(err); 
    });

    res.send("company added !");
});

module.exports = router;