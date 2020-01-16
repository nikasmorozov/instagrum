const User = require('./userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js')

const register = (req, res) => {
    let data = req.body
    let user = new User()
    user.username = data.username;
    user.password = data.password;
    user.save()
        .then((createdUser) => {
            res.json(createdUser)
        }).catch((e) => {
            res.status(400).json(e)
        })
};

const login = async (req, res) => {
    try {
        let user = await User.findOne({
            username: req.body.username
        })
        if (!user) {
            res.status(400).json('no such user');
            return
        }
        bcrypt.compare(req.body.password, user.password, (err, response) => {
            if (response) {
                let access = 'auth';
                let token = jwt.sign({
                    _id: user._id.toHexString(),
                    access 
                }, config.password).toString()
                user.tokens.push({
                    token,
                    access
                });
                user.save().then(() => {
                    res.header('x-auth', token).json(user);
                })
            } else {
                res.status(400).json("wrong password");
            }
        });
    } catch (e) {
        res.status(400).json(e);
    }
};

// let getAll = (req, res) => {
//     User.find()
//     .then((users) => {
//         res.json(users)
//     }).catch((e) => {
//         res.status(400).json(e)
//     })
// };

const getAll = async (req, res) => {
    try {
        let users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(400).json(e)
    }
}

const getSingleUser = async (req, res) => {
    let id = req.params.id;
    try {
        let user = await User.findOne({
            _id: id
        })
        res.json(user)
    } catch (e) {
        res.status(400).json(e)
    }
}

const deleteUserByName = async (req, res) => {
    let username = req.params.user;
    try {
        let user = await User.deleteOne({
            user: username
        })
        res.json(user)
    } catch (e) {
        res.status(400).json(e)
    }
}

const logout = (req, res) => {
    let token = req.token
    let user = req.user
    user.update({
      $pull: {
        tokens: {
          token
        }
      }
    }).then(() => {
      res.json("logged out")
    }).catch(e => res.status(400).json(e))
  };

module.exports = {
    register,
    getAll,
    getSingleUser,
    deleteUserByName,
    login,
    logout
};