const Comment = require('./commentModel.js');
const Post = require('../posts/postModel')

const addComment = async (req, res) => {
    try {
        let data = await req.body
        let comment = new Comment()
        comment.comment = data.comment;
        comment.postId = data.postId
        comment.user = req.user._id
        comment.save()

        let post = await Post.findOne({
            _id: data.postId
        }).populate('user', 'username profilePicURL')
        post.comment = comment
        post.save()
        res.json(post)
    } catch (e) {
        res.status(400).json(e)
    }
};

const getCommentsByPostId = async (req, res) => {
    try {
        let comments = await Comment.find({
            postId: req.params.id
        }).populate('user', 'username profilePicURL')
        res.json(comments)
    } catch (e) {
        res.status(400).json(e)
    }
};


module.exports = {
    addComment,
    getCommentsByPostId
};