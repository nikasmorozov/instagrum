const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    comment: {
        type: String,
        required: true
    },
    postId:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId, ref: "Users"
    }
})

let Comment = mongoose.model('comments', commentSchema);

module.exports = Comment;