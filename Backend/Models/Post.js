const mongoose = require('mongoose');
const postSchema = mongoose.Schema({
    "title": String,
    "body": String,
    "likes": String,
    "createdIn": Date,
    "createdBy": String,
    "comments": Array
})
module.exports = mongoose.model('posts', postSchema);
// comment = {
//         "commentedBy":String,
//         "body":String,
//         "commentedOn":Date,
//         "likes":String,
//         "dislikes":String
//     }