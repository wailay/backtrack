const express = require('express');
const router = express.Router();
const User = require('../../models/models').User;
var isUserAuth = require('../services/user.service').isUserAuthenticated;


router.use('/', isUserAuth);
//user route 

router.get('/', async (req, res) => {
    let users = await User.find({});
    res.status(200).send(users);
 });

//get user profile only (applications excluded)
router.get('/me', async (req ,res, next) => {
    try{
    let _id = req.user;
    //Exclude appplications so we dont get a large query
    let user = await User.findById(_id).select("-applications");
    res.status(200).send(user);
    }catch(err){
        next(err);
    }
});

//get user applications
router.get('/application', async (req, res, next) => {
    try{
    let _id = req.user;
    let user = await User.findById(_id);
    let applications = user.applications;
    res.status(200).send(applications);
    }
    catch(err){
        
        next(err);
    }
});

//add an applications to a user
router.post('/application/add', async(req, res, next) => {
    try{
        let _id = req.user;
        let application = req.body.app;

        let user = await User.findByIdAndUpdate({ _id : _id}, {$push : {applications : application}}, {useFindAndModify : false});
        
        res.status(200).send("Application added !");;


    }catch(err){
        next(err);
    }
});


// remove an applications from the user
router.delete('/application/:appId', async (req, res, next) => {
    try{
        let _id = req.user;
        let user = await User.findById({_id : _id});
        let _appId = req.params.appId;
        
        user.applications.pull(_appId);
        await user.save();
        res.status(200).send("Application removed !");

    }catch(err){
        next(err);
    }
});


router.post('/application/:appId/edit', async(req, res, next) => {
    try{
    let appStatus = req.body.status;
    let _id = req.user;
    let _appId = req.params.appId;
    
    let user = await User.findOneAndUpdate(
        { _id : _id, "applications._id" : _appId },
        { "$set" : { "applications.$.status" : appStatus }},
        { useFindAndModify : false } );
    
    
    res.status(200).send("Applicadion status updated!");
    }catch(err){
        next(err);
    }

});


module.exports = router;