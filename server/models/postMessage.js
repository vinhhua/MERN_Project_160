/*
    Post Model

*/

//  acquire mongoose
const mongoose = require("mongoose");

//  schema creation: title (String), message (String), creator (String), tags [String],
//  createdAt: {type: Date, default: new Date()}
const postSchema = mongoose.Schema({
    title: String,
    message: String,
    creator: String,
    tags: [String],
    createdAt: {
        type: Date,
        default: new Date(),
    },
})

//  create framework model
const PostMessage = mongoose.model('PostMessage', postSchema);

//  export default post
module.exports = PostMessage;
