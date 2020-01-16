const router = require('express').Router();
const userController = require('../user/userController.js');
const postController = require('../posts/postController.js');
const middleware = require('../middleware/middleware.js')
const multer = require('multer')
const crypto = require('crypto')


router.get('/', (rec, res) => {
    res.json('API is working')
});

const storage = multer.diskStorage({
    destination: 'images',
    filename: function (req, file, callback) {
        // callback(null,Date.now()+file.originalname)
        crypto.pseudoRandomBytes(16, function(err, raw) {
            if (err) return callback(err);
          
            callback(null, raw.toString('hex') + file.originalname);
          });
    }
});

var upload = multer({ storage: storage })


//user routes
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/getAllUsers', userController.getAll);
router.get('/user/getSingleUser/:id', userController.getSingleUser);
router.get('/user/deleteUserByName/:username', userController.deleteUserByName);
router.get('/user/logout', middleware.authenticate, userController.logout);



//post routes
router.post('/posts/createPost', middleware.authenticate, upload.single('avatar'), postController.createPost);
router.get('/posts/getAllPosts', middleware.authenticate, postController.getAllPosts);
router.get('/posts/getPostById/:id', postController.getPostById);
router.patch('/posts/toggleLike/:id', middleware.authenticate, postController.toggleLike);
router.delete('/posts/deletePostById/:id', postController.deletePostById);
// router.post('/posts/createImage', middleware.authenticate, postController.createPost);




module.exports = router;