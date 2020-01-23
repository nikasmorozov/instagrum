const User = require('./userModel.js');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const config = require('../config/config.js')

const register = (req, res) => {
    const host = req.hostname;
    const filePath = req.protocol + "://" + host + ":" + req.socket.localPort + '/' + req.file.path;

    let data = req.body
    let user = new User()
    user.username = data.username;
    user.password = data.password;
    user.profilePicURL = filePath;
    console.log('user',user);
    
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

const getAll = async (req, res) => {
    try {
        let users = await User.find()
        res.json(users)
    } catch (e) {
        res.status(400).json(e)
    }
};

const getSingleUser = async (req, res) => {
    let id = req.params.id;
    try {
        let user = await User.findOne({
            _id: id
        });
        res.json(user)
    } catch (e) {
        res.status(400).json(e)
    }
};

const followUser = async (req, res) => {
    

    User.findById(req.params.id, async function(err, user) {
        
        let user2 = req.params.id;
        let id = req.user.id;
        let isAddedToFollowing = await User.findOne({
            _id: id,
            following: {
                _id: user2
            }
        })
        console.log(id)
        console.log(user2)
        console.log(isAddedToFollowing)

        if (!isAddedToFollowing) {
            user.followers.push(req.user._id);
            user.save(async function(err) {
            if(err) {
                console.log(err)
            }
            else {
                let thisUser = req.user
                thisUser.following.push(user._id)
                let response = await thisUser.save()
                res.json(response)
            }
        })
        console.log("ADDED")
        } else {
            user.followers.pull(req.user._id);
            user.save(async function(err) {
            if(err) {
                console.log(err)
            }
            else {
                let thisUser = req.user
                thisUser.following.pull(user._id)
                let response = await thisUser.save()
                res.json(response)
            }
        })
        console.log("REMOVED")
        }

        // user.followers.push(req.user._id);
        // user.save(async function(err) {
        //     if(err) {
        //         console.log(err)
        //     }
        //     else {
        //         let thisUser = req.user
        //         thisUser.following.push(user._id)
        //         let response = await thisUser.save()
        //         res.json(response)
        //     }
        // })
    })



//     let id = req.params.id;
//     let user = req.user.id;
//     let thisUser = req.user;
//     let followingId = req.user.following._id;
//     try {
//         let findUser = await User.findOne({
//             _id: id
//         });

//         let isAddedToFollowing = await User.findOne({
//             _id: id,
//             following: thisUser
//         });

//         if (!isAddedToFollowing) {
//             findUser.followers.push(user);
//             thisUser.following.push(user._id);
//         } else {
//             findUser.followers.pull(user);
//             thisUser.following.pull(user._id);
//         };

//         findUser.save(() => {
//             let response = thisUser.save()
//             res.json(response)
//         });
//         // res.json(findUser)
        
//     } catch (e) {
//         res.status(400).json(e)
//     }
}

const deleteUserByName = async (req, res) => {
    let username = req.params.username;
    try {
        let user = await User.deleteOne({
            username: username
        })
        res.json(user)
    } catch (e) {
        res.status(400).json(e)
    }
};

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
    logout,
    followUser
};