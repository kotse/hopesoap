var path = require('path');
var logger = require('morgan');
var bodyParser = require('body-parser');
var fs = require('fs');

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


var form = "<!DOCTYPE HTML><html><body>" +
"<form method='post' action='/upload' enctype='multipart/form-data'>" +
"<input type='text' name='soapName' value=''/>" +
"<input type='text' name='quantity' value=''/>" +
"<input type='text' name='category' value=''/>" +
"<input type='file' name='image'/>" +
"<input type='submit' /></form>" +
"</body></html>";

app.get('/upload', function (req, res){
	res.writeHead(200, {'Content-Type': 'text/html' });
	res.end(form);

});

app.post('/upload', function(req, res) {
    uploadFile(req, res);
	res.redirect('/upload');
});

var inspect = require('util').inspect;
var Busboy = require('busboy'),
os = require('os');
	
function uploadFile(req, res) {
	var soap = {};
	var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var target_path = __dirname + '/public/img/soaps/' + filename;		
		soap['filePath'] = target_path;
		file.pipe(fs.createWriteStream(target_path));
    });
    busboy.on('field', function(fieldname, val, fieldnameTruncated, valTruncated) {
		soap[fieldname] = val;
		console.log('Field [' + fieldname + ']: value: ' + inspect(val));
    });
    busboy.on('finish', function() {
      console.log('Done parsing form!');
	  console.log(soap);
	  saveSoap(req, res, soap);
    });
    req.pipe(busboy);
}

function saveSoap(req, res, soap) {
	var db = req.db;	
	db.collection('soaps', function(err, collection) {
		collection.insert(soap, {safe:true}, function(err, result) {
		if (err) {
			res.send({'error':'An error has occurred'});
		} else {
			console.log('Success: ' + JSON.stringify(result[0]));
			//res.send(result[0]);
		}
		});
	});

}

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