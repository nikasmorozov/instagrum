const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    postId:{
        type: String
    },
    commenterName:{
        type: String
    }
})

let Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;