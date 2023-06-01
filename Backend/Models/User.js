const mongoose = require('mongoose');
const userSchema = mongoose.Schema({
    "firstName": String,
    "lastName": String,
    "userName": String,
    "email": String,
    "password": String,
    "createdIn": Date,
    "postIds": Array,
    "sharedWithMe": Array,
    "myLikes": Array

});

module.exports = mongoose.model('users', userSchema);