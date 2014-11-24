var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongoClient = new MongoClient(new Server('localhost', 27017, {native_parser : true}));
var db = mongoClient.db('hopesoap');
var BSON = require('mongodb').BSONPure;
var passwordHash = require('password-hash');

var express = require('express');
var app = express();
var session = require('express-session');
app.use(session({
secret: "some secret key",
saveUninitialized: true, 
resave: true}));

app.use(function(req,res,next){
    req.db = db;
	req.mongoClient = mongoClient;
	req.BSON = BSON;
	var err = req.session.error, msg = req.session.success;
    delete req.session.error;
    delete req.session.success;
    res.locals.message = '';
    if (err) res.locals.message = err;
    if (msg) res.locals.message = msg;

    next();
});

var catalog = require('./routes/catalog');


app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public/'))
app.use(logger('dev'));
app.use( bodyParser.json() ); // to support JSON-encoded bodies
app.use( bodyParser.urlencoded({ extended: false }) ); // to support URL-encoded bodies
app.use('/', catalog);


mongoClient.open(function(err, mongoClient){
		if(err) throw err;
		console.log("server has started");
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})


function authenticate(username, password, fn) {
    if (!module.parent) console.log('authenticating %s', username);

    db.collection('users', function(err, collection) {
			collection.findOne({'username': username}, function(err, user) {
				if (err) {
					return fn(err);
				}
		 
				if (!user) {
					return fn(null, false);
				}
		 
				if (!passwordHash.verify(password, user.password)) {
					return fn(null, false);
				}
		 
				return fn(null, user);
		});
	});

}

app.post("/login", function (req, res) {
	console.log(req.params);
    authenticate(req.body.username, req.body.password, function (err, user) {
        if (user) {

            req.session.regenerate(function () {

                req.session.user = user;
                req.session.success = 'Success authenticating as ' + user.username;
                res.redirect('/admin.html');
            });
        } else {
            req.session.error = 'Authentication failed';
            res.redirect('/login.html?error=' + req.session.error);
        }
    });
});


app.get('/logout', function (req, res) {
    req.session.destroy(function () {
        res.redirect('/login.html');
    });
});


/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});


module.exports = app;