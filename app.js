var express = require('express');
var path = require('path');
var hbs = require('express-handlebars');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');
var flash = require('connect-flash');
var mongoose = require('mongoose');
var index = require('./routes/index');
var users = require('./routes/users');
var api = require('./routes/api');
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;


mongoose.connect('mongodb://localhost/nightlife');
var db = mongoose.connection;
mongoose.Promise = global.Promise;


var app = express();


app.set('view engine', 'hbs');
app.engine('hbs', hbs({
    extname: 'hbs',
    defaultLayout: 'layout'
}));

app.set('views', path.join(__dirname, '/views'));

app.use(express.static(path.join(__dirname, '/public')));
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(session({
    secret: 'keyboard cat',
    resave: true,
    saveUninitialized: true
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

app.use(function(req, res, next) {
    res.locals.success_msg = req.flash('success_msg');
    res.locals.error_msg = req.flash('error_msg');
    res.locals.error = req.flash('error');
    res.locals.user = req.user;
    next();
});

app.use('/', index);
app.use('/auth/', users);
app.use('/api',api);

var server = 3000;
app.listen(server, function() {
    console.log('Server is listening on port: ' + server);
});

