const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    likes: [{
        type: String
    }],
    comments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: 'Comment' 
    }],
    date: { 
        type: Date, 
        default: Date.now 
    },
    imageURL:{
        type: String
    } 
})

let Post = mongoose.model('posts', postSchema);

module.exports = Post;