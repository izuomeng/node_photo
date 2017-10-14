var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/photo_app');

var scheme = new mongoose.scheme({
    name: String,
    path: String
});

module.exports = mongoose.model('Photo', scheme);