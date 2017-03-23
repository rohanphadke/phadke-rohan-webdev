var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    _user : {type:mongoose.Schema.Types.ObjectId, ref:'userModel'},
    name : String,
    description : String,
    pages : [],
    dateCreated : Date
}, {collection: 'assignment.website'});

module.exports = UserSchema;