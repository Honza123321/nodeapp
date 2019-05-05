let express = require('express');
let router = express.Router();
let User = require('../models/user');


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
    res.render('login', { title: 'Express' });
});

router.get('/createUser', function(req, res, next) {
    res.render('createUser', { title: 'Express' });
});

router.post('/createUser', function(req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    let password2 = req.body.passwordAgain;
    if(username && password && password2){
        User.addUser(username, password, function (err) {
            if(err){
                res.render('createUser', {type: "warning",error: "Login already exists"})
            }else{
                res.render('login', {type: 'success', error:""});
            }
        });
    }else{
        res.render('createUser', { type: "warning", error: 'All fields have to be filled.' });
    }
});


router.post('/login', function (req, res, next) {
    let username = req.body.username;
    let password = req.body.password;
    if(username && password) {
    User.authenticate(username, password, function (err, user) {
        if(err) {
          res.render('login', {error: "Wrong password or username."})
        } else {
          req.session.loggedUser = user;

          res.redirect('/todo');
        }
    });
    } else {
        res.render('login', {error: "You must fill all fields."})
    }

});

router.get('/logout', function(req, res, next) {
    if (req.session) {
        // delete session object
        req.session.destroy(function(err) {
            if(err) {
                return next(err);
            } else {
                return res.redirect('/login');
            }
        });
    }
});




module.exports = router;
