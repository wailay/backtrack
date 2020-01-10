var express = require('express');
var router = express.Router();
var passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var User = require('../../models/models').User;
const bcrypt = require('bcryptjs');
const saltRounds = 10;


passport.use(new LocalStrategy({ usernameField: 'email' },
    function (email, password, done) {

        User.findOne({ email: email }, function (err, user) {

            if (err) throw err;

            if (!user) {
                return done(null, false);
            }
            //verify password with hash in db
            bcrypt.compare(password, user.password).then(res => {
                if (res) {
                    return done(null, user);

                } else {
                    return done(null, false);
                }
            }).catch(e => {
                console.log("bcrypt error", e);
            });

        });


    }
));

router.get('/', function (req, res) {
    let isLoggedIn = false;
    if (req.user) isLoggedIn = true; 
    res.status(200).send({isLoggedIn : isLoggedIn});
     
});

router.post('/login', passport.authenticate('local'), function(req, res, next) {
    console.log('trying to login')
        try {
            res.status(200).send("Login successful");
        } catch (err) {
            next(err);
        }
    });

router.get('/logout', function (req, res) {
    req.logout();
    res.status(200).send("Logout successful !");
});

router.post('/signin', async (req, res, next) => {
    try {

        let email = req.body.email;
        let plainPwd = req.body.password;

        let hashPwd = await bcrypt.hash(plainPwd, saltRounds);

        User.create({
            email: email,
            password: hashPwd,
        });
        res.status(200).send("User created!");
    } catch (err) {
        next(err);
    };
});

passport.serializeUser(function (user, done) {
    done(null, user.id);
});

passport.deserializeUser(function (id, done) {
    User.findById(id, function (err, user) {
        done(err, user.id);
    });
});

module.exports = router;