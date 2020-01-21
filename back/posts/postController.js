const Post = require('./postModel.js');
const User = require('../user/userModel.js');


const createPost = (req, res) => {
    const host = req.hostname;
    const filePath = req.protocol + "://" + host + ":" + req.socket.localPort + '/' + req.file.path;

    console.log(filePath);

    let data = req.body
    let post = new Post()
    post.title = data.title;
    post.user = req.user._id;

    post.imageURL = filePath
    post.save()
    .then((createdPost) => {
        res.json(createdPost)
    }).catch((e) => {
        res.status(400).json(e)
    })
};

const getAllPosts = async (req, res) => {
    try {
        let posts = await Post.find({
            // user: req.user._id
        })
        res.json(posts)
    } catch (e) {
        res.status(400).json(e)
    }
};

const getPostById = async (req, res) => {
    let postTitle = req.params._id;
    try {
        let post = await Post.findOne({
            post: postTitle
        })
        res.json(post)

    } catch (e) {
        res.status(400).json(e)
    }
};

const toggleLike = async (req, res) => {
    let id = req.params.id;
    let user = req.user.id;
    try {
        let post = await Post.findOne({
            _id: id
        });

        let isLiked = await Post.findOne({
            _id: id,
            likes: user
        });

        if (!isLiked) {
        post.likes.push(user)
        } else {
            post.likes.pull(user)
        };

        post.save();
        res.json(post)

    } catch (e) {
        res.status(400).json(e)
    }
};

const getLikesUsers = async (req, res) => {
    let id = req.params.id;

    try {
        let post = await Post.findOne({
            _id: id
        });

        let likesUsers = await User.find({
            _id: post.likes
        });

        res.json(likesUsers)
    } catch (e) {
        res.status(400).json(e)
    }
};

const deletePostById = async (req, res) => {
    let id = req.params.id;
    try {
        let post = await Post.deleteOne({
            _id: id
        })
        res.json(post)
    } catch (e) {
        res.status(400).json(e)
    }
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    deletePostById,
    toggleLike,
    getLikesUsers
};
