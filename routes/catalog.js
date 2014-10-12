var express = require('express');
var router = express.Router();
var inspect = require('util').inspect;
var Busboy = require('busboy');
var os = require('os');
var fs = require('fs');	

//the url with param in it should be before the generic one, it doesn't work the other way
router.get('/soaps/:id', function(req, res) {
	var db = req.db;
	var BSON =  req.BSON;
	var id = req.params.id;
	console.log(id);
	 db.collection('soaps', function(err, collection) {
		collection.findOne({'_id':new BSON.ObjectID(id)}, function(err, item) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(item);
			}
		});
	});

});

router.get('/soaps', function(req, res) {
	var db = req.db;
	db.collection('soaps', function(err, collection) {
		collection.find().toArray(function(err, items) {
			if (err) {
				res.send({'error':'An error has occurred'});
			} else {
				res.send(items);
			}
		});
	});

});

router.post('/soaps', function(req, res) {
	var db = req.db;
	console.log(req.body);
	var soap = req.body
	
	db.collection('soaps', function(err, collection) {
		collection.insert(soap, {safe:true}, function(err, result) {
		if (err) {
			res.send({'error':'An error has occurred'});
		} else {
			console.log('Success: ' + JSON.stringify(result[0]));
			res.send(result[0]);
		}
		});
	});

});

router.delete('/soaps/:id', function(req, res) {
	var id = req.params.id;
	console.log('Deleting soap: ' + id);
	var db = req.db;
	var BSON =  req.BSON;
	db.collection('soaps', function(err, collection) {
		collection.remove({'_id':new BSON.ObjectID(id)}, {safe:true}, function(err, result) {
			if (err) {
				res.send({'error':'An error has occurred - ' + err});
			} else {
				console.log('' + result + ' document(s) deleted');
				res.send(req.body);
			}
		});
	});
});


router.post('/soap/upload', function(req, res) {
    uploadFile(req, res);
	res.redirect('/../admin.html');
});


function uploadFile(req, res) {
	var soap = {};
	var busboy = new Busboy({ headers: req.headers });
    busboy.on('file', function(fieldname, file, filename, encoding, mimetype) {
        var target_path = __dirname + '/../public/img/soaps/' + filename;		
		soap['filePath'] = filename;
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

module.exports = router;