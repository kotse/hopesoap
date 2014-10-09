var express = require('express');
var router = express.Router();


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

module.exports = router;