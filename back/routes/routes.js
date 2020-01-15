const router = require('express').Router();
const userController = require('../user/userController.js');
const postController = require('../posts/postController.js');
const middleware = require('../middleware/middleware.js')


router.get('/', (rec, res) => {
    res.json('API is working')
});

//user routeses
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/getAllUsers', userController.getAll);
router.get('/user/getSingleUser/:id', userController.getSingleUser);
router.get('/user/deleteUserByName/:username', userController.deleteUserByName);
router.get('/user/logout', middleware.authenticate, userController.logout);



//post routes
router.post('/posts/createPost', middleware.authenticate, postController.createPost);
router.get('/posts/getAllPosts', middleware.authenticate, postController.getAllPosts);
router.get('/posts/getPostByName/:post', postController.getPostByTitle);
router.patch('/posts/toggleLike/:id', postController.toggleLike);
router.delete('/posts/deletePostById/:id', postController.deletePostById);




module.exports = router;