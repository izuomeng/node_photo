var express = require('express');
var router = express.Router();
var multer  = require('multer');

var photos = [];

// Post method
var Photo = require('../models/Photo'),
	path = require('path'),
	fs = require('fs'),
	join = path.join,
	upload = multer({dest: 'uploads/'});

for (var i = 1; i < 5; i++) {
	photos.push({
		name: i + '',
		path: `http://120.24.43.150/img/${i}.jpg`
	});
}
router.get('/photos', function(req, res) {
	res.render('photos', {
		title: 'Photos',
		photos
	});
});
router.get('/upload', function(req, res) {
	res.render('photos/upload', {
		title: 'Photo upload'
	});
});
router.post('/upload', upload.single('photo_image'), function(req, res, next) {
	console.log(req.body, req.file);
	var img = req.file,
		name = req.body.photo_name || img.originalname,
		path = join(__dirname, `../public/images/${img.originalname}`);
	fs.rename(img.path, path, function(err) {
		if (err) {
			return next(err);
		}
		Photo.create({
			name,
			path
		}, function(err) {
			if (err) {
				return next(err);
			}
			res.redirect('/');
		});
	});
});
module.exports = router;
