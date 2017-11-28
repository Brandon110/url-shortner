var mongoose = require('mongoose');
var findOrCreate = require('mongoose-findorcreate');

var Schema = mongoose.Schema;

var newSchema = new Schema({
   original_url: String,
   shortend_url: String
});

newSchema.plugin(findOrCreate)

var modelClass = mongoose.model('url', newSchema);
module.exports = modelClass;