var mongoose = require('mongoose');

var UserSchema = mongoose.Schema({
    _page : {type:mongoose.Schema.Types.ObjectId, ref: 'pageModel'},
    type : {type: String, enum: ['HEADER', 'IMAGE', 'YOUTUBE', 'HTML', 'INPUT']},
    name : String,
    text : String,
    placeholder : String,
    description : String,
    url : String,
    width : String,
    height : String,
    rows : Number,
    size : Number,
    class : String,
    icon : String,
    deletable : Boolean,
    formatted : Boolean,
    dateCreated : Date,
    order : Number
}, {collection: 'assignment.widget'});

module.exports = UserSchema;