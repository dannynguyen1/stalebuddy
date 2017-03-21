var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'Express'
    });
});

router.get('/logout', function(req, res, next) {
    res.cookie('accountnum', "-1", {
            maxAge: 900000,
            httpOnly: true
    });
});

router.get('/account', function(req, res, next) {
    if (req.cookies.accountnum > 0) {
        res.render('account_page', {
            title: 'Express'
        });
    } else {
    	res.status(401).end();
    }
});

router.get('/register', function(req, res, next) {
    res.render('register', {
        title: 'Express'
    });
});

router.get('/Login', function(req, res, next) {
    res.render('Login', {
        title: 'Express'
    });
});

router.post("/login", function(req, res, next) {
    if (req.body.email == "danny_nguyen1@student.uml.edu" &&
        req.body.password == "password") {
        res.cookie('accountnum', "1", {
            maxAge: 900000,
            httpOnly: true
        });
        res.end("OK");
    } else {
        res.status(401).end();
    }
})

module.exports = router;