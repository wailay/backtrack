//TODO refactor business logic code here

var User = require('../../models/models').User;



//Use the function provided by passportjs (Or just check if req.user is set)
function isUserAuthenticated(req, res, next) {
    console.log(req.user);
    if (req.isAuthenticated()) {    
        next();
    } else {
        res.status(401).send("User not logged in");
    }
    
};

module.exports = {
    isUserAuthenticated: isUserAuthenticated,
}
