require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
var session = require('express-session');
const MongoStore = require('connect-mongo')(session);
var passport = require('passport');
var user_route = require('./routers/user.router');
var company_route = require('./routers/company.router'); 
var auth_route = require('./routers/auth.router');
var mongoose = require('./db');
var errorHandler = require('./services/error_handler');

const origin = true;
const cookie = { secure: false, httpOnly: false };

var cors = require('cors');

if(process.env.NODE_ENV === "production"){
    origin = 'https://trailmark.me';
    cookie = {secure: true, httpOnly: true };
}
var corsOptions = {
    origin: origin,
    optionsSuccessStatus: 200,
    credentials: true,
    methods: ['GET', 'POST', 'DELETE'],
  }
var app = express();

app.use(session({ 
    secret: 'yoooooooooo secret oyooooo yoo haha ez clap',
    resave : false,
    saveUninitialized : false,
    store: new MongoStore({ mongooseConnection: mongoose.connection, ttl : 2 * 24 * 60 * 60, }),
    cookie: cookie,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors(corsOptions));

 
//routes declaration
app.use('/api/user', user_route);
app.use('/api/company', company_route);
app.use('/api/auth', auth_route);
app.use(errorHandler);


app.listen(process.env.PORT, () => {
    console.log(`listening on port ${process.env.PORT}`);
})