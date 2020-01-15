const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    post: {
        type: String,
        required: true,
        unique: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    likes: { 
        type: Number, 
        default: 0 
    },
    // comments: [{ 
    //     type: Schema.Types.ObjectId, 
    //     ref: 'Comment' 
    // }],
    date: { 
        type: Date, 
        default: Date.now },
    imageURL: String   // instead of this
})

let Post = mongoose.model('tasks', postSchema);

module.exports = Post;