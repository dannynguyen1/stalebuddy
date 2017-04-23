var express = require('express');
var router = express.Router();
var db = require("../db.js");
var Promise = require('bluebird-co');
var ObjectId = require('mongodb').ObjectID;
var walmart = require('walmart')("pjsxwgy68ucqd6cwt9rcf2ab");

var twilio = require('twilio')('AC0293b062c11a10845b444e53c171e300', 'd171fda81556464fc5bff4007799af13');
router.get('/', function(req, res, next) {
    res.render('index');
});
router.get('/logout', function(req, res, next) {
    res.cookie('accountnum', "-1", {
        maxAge: 900000,
        httpOnly: true
    });
});
router.get('/dashboard', function(req, res, next) {
    if (req.cookies.accountnum != null && req.cookies.accountnum != "") {
        Promise.coroutine(function*() {
            yield db.connect();
            //  Get current user with the id equal to the cookie accountNum
            var user = (yield(cb) => {
                db.Users.find({
                    _id: ObjectId(req.cookies.accountnum)
                }).toArray(cb);
            })[0];
            res.render('dashboard', {
                grocery_list: user.grocery_list
            });
        })();
    } else {
        res.redirect("/login");
    }
});
router.get('/register', function(req, res, next) {
    res.render('register');
});
router.get('/Login', function(req, res, next) {
    res.render('Login');
});
router.get('/table', function(req, res, next) {
    res.render('table');
});

router.post("/login", function(req, res, next) {
    Promise.coroutine(function*() {
        yield db.connect();
        var user = yield db.Users.find({
            "email": req.body.email,
            "password": req.body.password
        }).toArray();
        if (user.length > 0) {
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
        var u = (yield(cb) => {
            db.Users.insert({
                "name": req.body.name,
                "email": req.body.email,
                "phone": req.body.phone,
                "password": req.body.password,
                "grocery_list": [],
                "recipes": [],
               "log_book": []
            }, cb);
        });
        var user = yield db.Users.find({
            "email": req.body.email,
            "password": req.body.password
        }).toArray();
        if (user.length > 0) {
            res.cookie('accountnum', user[0]._id, {
                maxAge: 900000,
                httpOnly: true
            });
            res.end("OK");
        }
    })();
    sendTextForRegistering(req.body.name, req.body.phone);
});
router.post("/addItem", function(req, res, next) {
    Promise.coroutine(function*() {
        yield db.connect();
        console.log(req.cookies.accountnum);
        //  Get current user with the id equal to the cookie accountNum
        var user = (yield(cb) => {
            db.Users.find({
                _id: ObjectId(req.cookies.accountnum)
            }).toArray(cb);
        })[0];
        //  Add the item to the variable above.
        //console.log(user);
        user.grocery_list.push(req.body);
       console.log(user);
        //  Re-store that variable back in the database.
        yield(cb) => {
            db.Users.update({
                _id: ObjectId(req.cookies.accountnum)
            }, user, cb);
        };
    })();
    res.end("OK");
});

router.delete("/deleteItem", function(req, res, next) {
    Promise.coroutine(function*() {
        yield db.connect();
        console.log(req.cookies.accountnum);
        //  Get current user with the id equal to the cookie accountNum
        var user = (yield(cb) => {
            db.Users.find({
                _id: ObjectId(req.cookies.accountnum)
            }).toArray(cb);
        })[0];
        //  Add the item to the variable above.
        console.log(user);
       //user.grocery_list.splice(1, 1);
        //  Re-store that variable back in the database.
        yield(cb) => {
            db.Users.update({
                _id: ObjectId(req.cookies.accountnum)
            }, {$pull: {"grocery_list" : {"product": req.body.product, "expiration": req.body.expiration, "comments": req.body.comments, "price": req.body.price}}}, false, false);
        };
    })();
    res.end("OK");
});

router.post("/lookupItem", function(req, res, next) {
    Promise.coroutine(function*() {
        var item = yield walmart.getItemByUPC(req.body.upc);
        console.log(item);
        res.json(item);
    })();
});

function sendTextForRegistering(name, phone) {
    twilio.sendMessage({
        to: phone,
        from: "3393646331",
        body: 'Thanks for joining StaleBuddy :)'
    }, function(err, responseData) {
        if (!err) {
            console.log(responseData.from); // outputs "+14506667788"
            console.log(responseData.body); // outputs "word to your mother."
        }
    });
}



module.exports = router;