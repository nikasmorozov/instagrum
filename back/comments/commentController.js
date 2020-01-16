const Comment = require('./commentModel.js');

const addComment = (req, res) => {
    let data = req.body
    let comment = new Comment()
    comment.comment = data.comment;
    comment.postId = data.postId
    comment.username = req.user.username
    comment.save()
    .then((newComment) => {
        res.json(newComment)
    }).catch((e) => {
        res.status(400).json(e)
    })
};


module.exports = {
    addComment
};