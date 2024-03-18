const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');

const UserSchema = new Schema({
    email : {type: String, lowerCase:true, required: true, unique:true},
    password: {type: String, selected: false , required: true},
    created: {type: Date, default: Date.now }
});

const User = mongoose.model('User',UserSchema)

module.exports = User;

