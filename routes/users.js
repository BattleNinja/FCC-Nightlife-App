var express = require('express');
var router = express.Router();
var passport = require('passport');
var Strategy = require('passport-twitter').Strategy;
var User = require('../models/user');


passport.use(new Strategy({
        consumerKey: "TGErN8Z1Al8IYE9XDgR2Xl4j6",
        consumerSecret: "bsvsqMKA028PLykzG4NTp6ufBJ9pPs04hJBz37XULR4uxoHk4M",
        callbackURL: 'http://127.0.0.1:3000/auth/twitter/callback'
    },
    function (token, tokenSecret, profile, cb) {
        // In this example, the user's Twitter profile is supplied as the user
        // record.  In a production-quality application, the Twitter profile should
        // be associated with a user record in the application's database, which
        // allows for account linking and authentication with other identity
        // providers.
        return cb(null, profile);
    }));

passport.serializeUser(function (user, cb) {
    cb(null, user);
});

passport.deserializeUser(function (obj, cb) {
    cb(null, obj);
});


router.get('/twitter',
    passport.authenticate('twitter'),
    function (req, res) {
        // console.log(req.user)
    });

router.get('/twitter/callback',
    passport.authenticate('twitter', {
        failureRedirect: '/auth/twitter'
    }),
    function (req, res) {
        User.findOne({id: req.user.id}, function (err, data) {
            if (err) throw err;
            if (data === null) {
                var user = new User({
                    id: req.user.id,
                    name: req.user.displayName,
                    username: req.user.username,
                    likelist: []
                });
                console.log('works');
                user.save(function (err, user) {
                    if (err) throw err;
                    console.log(user);
                });
            }else{
                console.log('we have saved this user')
            }
        });
        console.log(req.user.id);
        res.redirect('/');
    });

router.get('/logout', function (req, res) {
    req.logout();
    req.flash('success_msg', 'You are loged out');
    res.redirect('/')
});


router.get('/profile',
    require('connect-ensure-login').ensureLoggedIn('/auth/twitter'),
    function (req, res) {
        res.render('profile', {
            username: req.user.username,
            imglink: req.user.photos[0].value,
            name: req.user.displayName,
            id: req.user.id
        });
        // console.log(req.user.photos[0].value)
    });

module.exports = router;
