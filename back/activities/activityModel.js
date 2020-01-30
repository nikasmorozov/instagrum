const mongoose = require('mongoose');
const User = require('../user/userModel.js');
const Post = require('../posts/postModel.js');




const activitySchema = new mongoose.Schema({
    user1: String,
    title: {
        type: String,
    },
    user2: String,
    post:{
        type: mongoose.Schema.Types.ObjectId, ref: Post
    },
    date: { 
        type: Date, 
        default: Date.now 
    }
});

let Activity = mongoose.model('activities', activitySchema);

module.exports = Activity;