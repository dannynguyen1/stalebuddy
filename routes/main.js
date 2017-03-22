var express = require('express');
var router = express.Router();
var db = require("../db.js");
var Promise = require('bluebird-co');

router.get('/', function(req, res, next) {
    res.render('index');
});

router.get('/logout', function(req, res, next) {
    res.cookie('accountnum', "-1", {
        maxAge: 900000,
        httpOnly: true
    });
});

router.get('/account', function(req, res, next) {
    if (req.cookies.accountnum != null && req.cookies.accountnum != "") {
        res.render('account_page', {
            title: 'Express'
        });
    } else {
        res.status(401).end();
    }
});

router.get('/register', function(req, res, next) {
    res.render('register');
});

router.get('/Login', function(req, res, next) {
    res.render('Login');
});

router.post("/login", function(req, res, next) {
    Promise.coroutine(function*() {
        yield db.connect();
        var user = yield db.Users.find({
                "email": req.body.email,
                "password": req.body.password
        }).toArray();
        if(user.length > 0) {
            res.cookie('accountnum', user[0]._id, {
                maxAge: 900000,
                httpOnly: true
            });
            res.end("OK");
        } else {
            res.status(401).end();
        }
    })();
});

router.post("/register", function(req, res, next) {
    Promise.coroutine(function*() {
        yield db.connect();
        (yield(cb) => {
            db.Users.insert({
                "name": req.body.name,
                "email": req.body.email,
                "phone": req.body.phone,
                "password": req.body.password,
                "grocery_list": [],
                "recipes": []
            });
        });
    })();
    res.end("OK");
})

module.exports = router;