var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');

var MongoClient = require('mongodb').MongoClient;
var Server = require('mongodb').Server;
var mongoClient = new MongoClient(new Server('localhost', 27017, {native_parser : true}));
var db = mongoClient.db('hopesoap');
var BSON = require('mongodb').BSONPure;

var express = require('express');
var app = express();

app.use(function(req,res,next){
    req.db = db;
	req.mongoClient = mongoClient;
	req.BSON = BSON;
    next();
});

var catalog = require('./routes/catalog');


app.set('port', (process.env.PORT || 8080))
app.use(express.static(__dirname + '/public/'))
app.use(logger('dev'));
app.use(bodyParser.json());
app.use('/', catalog);


mongoClient.open(function(err, mongoClient){
		if(err) throw err;
		console.log("server has started");
});


app.listen(app.get('port'), function() {
  console.log("Node app is running at localhost:" + app.get('port'))
})

/*
/// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});*/

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