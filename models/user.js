const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
    id:String,
    name:String,
    username:String,
    likelist:[String]
});

const User = module.exports = mongoose.model('user',userSchema);
