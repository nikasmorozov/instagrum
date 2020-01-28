const router = require('express').Router();
const userController = require('../user/userController.js');
const postController = require('../posts/postController.js');
const commentController = require('../comments/commentController.js');
const middleware = require('../middleware/middleware.js');
const multer = require('multer');
const crypto = require('crypto');


router.get('/', (rec, res) => {
    res.json('API is working')
});

const storage = multer.diskStorage({
    destination: 'images',
    filename: function (req, file, callback) {
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return callback(err);
          
            callback(null, raw.toString('hex') + file.originalname);
        });
    }
});

var upload = multer({ storage: storage })


//user routes
router.post('/user/register', upload.single('profilePic'), userController.register);
router.post('/user/login', userController.login);
router.get('/user/getAllUsers', userController.getAll);
router.get('/user/getSingleUser/:id', userController.getSingleUser);
router.get('/user/deleteUserByName/:username', userController.deleteUserByName);
router.get('/user/logout', middleware.authenticate, userController.logout);
// router.post('/user/verifyPsw', middleware.authenticate, userController.checkPsw);
router.post('/user/changeUserInfo', middleware.authenticate, userController.changeUserInfo);
router.post('/user/changeAvatar', middleware.authenticate, upload.single('profilePic'), userController.changeAvatar);



//post routes
router.post('/posts/createPost', middleware.authenticate, upload.single('postPic'), postController.createPost);
router.get('/posts/getAllPosts', middleware.authenticate, postController.getAllPosts);
router.get('/posts/getPostById/:id', postController.getPostById);
router.patch('/posts/toggleLike/:id', middleware.authenticate, postController.toggleLike);
router.delete('/posts/deletePostById/:id', postController.deletePostById);
router.get('/posts/getLikesUsers/:id', postController.getLikesUsers);

// router.post('/posts/createImage', middleware.authenticate, postController.createPost);

//Comment routes
router.post('/comments/addComment', middleware.authenticate, commentController.addComment)
router.get('/comments/getCommentsByPostId/:id', middleware.authenticate, commentController.getCommentsByPostId)



module.exports = router;