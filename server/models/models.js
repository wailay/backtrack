var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var companySchema = new Schema({
    name : String,
    url : String,
});

var applicationSchema = new Schema({
    company : companySchema,
    status : {type : String, default : 'Pending'},
    date : {type : Date, default : Date.now},
    location : String,
    position : String,

});
var userSchema = new Schema({
    provider: {type : String, default : "null"},
    email: String,
    password: String,
    provider_id: {type : String, default : "null"},
    applications : [applicationSchema],
});

var User = mongoose.model('User', userSchema);
var Company = mongoose.model('Company', companySchema);

module.exports = {
    User : User,
    Company : Company,
};