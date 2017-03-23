var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    _website : {type:mongoose.Schema.Types.ObjectId, ref: 'websiteModel'},
    name : String,
    title : String,
    description : String,
    widgets : [],
    dateCreated : Date
}, {collection: 'assignment.page'});

module.exports = UserSchema;