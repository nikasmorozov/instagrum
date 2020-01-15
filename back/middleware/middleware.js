const config = require('../config/config.js');
const jwt = require('jsonwebtoken');
const User = require('../user/userModel.js')


const alterData = (req, res, next) => {
    if (req.body.post) {
        let post = req.body.post[0].toUpperCase() + req.body.post.slice(1);
        req.body.post = post;
        next();
    }
}

const authenticate = async (req, res, next) => {
    let token = req.header('x-auth');
    let decoded;
    try {
        decoded = jwt.verify(token, config.password)
        let user = await User.findOne({
            _id: decoded._id,
            "tokens.token": token
        })
        if (user) {
            req.user = user;
            req.token = token;
            next()
        } else {
            res.status(401).json('Not authorised')
        }
    } catch(e) {
        res.status(400).json(e)
    }
}

module.exports = {
    alterData,
    authenticate
}