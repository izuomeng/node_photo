var express = require('express');
var router = express.Router();

var photos = [];
for (var i = 1; i < 5; i++) {
	photos.push({
		name: i + '',
		path: `http://120.24.43.150/img/${i}.jpg`
	});
}
router.get('/', function(req, res) {
	res.render('photos', {
		title: 'Photos',
		photos
	});
});

module.exports = router;