var express = require("express"),
    router = express.Router(),
    passport = require("passport"),
    User = require("../models/user");

//index page
router.get('/', function (req, res) {
    res.render('landing');
});

// signup route
router.get('/register', function (req, res) {
    res.render('register', {
        page: 'register'
    });
});

//sign up logic
router.post('/register', function (req, res) {
    var newUser = new User({
        username: req.body.username
    });
    User.register(newUser, req.body.password, function (err, user) {
        if (err) {
            console.log(err);
            return res.render("register", {
                error: err.message
            });
        }
        passport.authenticate('local')(req, res, function () {
            req.flash("success", "Welcome to YelpCamp " + user.username);
            res.redirect('/campgrounds');
        });
    });
});

// login
router.get('/login', function (req, res) {
    res.render('login', {
        page: 'login'
    });
});
// login logic
router.post(
    '/login',
    passport.authenticate('local', {
        successRedirect: '/campgrounds',
        failureRedirect: '/login'
    }),
    function (req, res) {}
);
// logout logic
router.get('/logout', function (req, res) {
    req.logout();
    req.flash("error", "Logged You Out");
    res.redirect('/campgrounds');
});

module.exports = router;