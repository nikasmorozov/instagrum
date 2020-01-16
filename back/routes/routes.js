const router = require('express').Router();
const userController = require('../user/userController.js');
const postController = require('../posts/postController.js');
const middleware = require('../middleware/middleware.js')


router.get('/', (rec, res) => {
    res.json('API is working')
});

//user routes
router.post('/user/register', userController.register);
router.post('/user/login', userController.login);
router.get('/user/getAllUsers', userController.getAll);
router.get('/user/getSingleUser/:id', userController.getSingleUser);
router.get('/user/deleteUserByName/:username', userController.deleteUserByName);
router.get('/user/logout', middleware.authenticate, userController.logout);
router.post('/user/:user_id/follow-user', middleware.authenticate, userController.followUser)



//post routes
router.post('/posts/createPost', middleware.authenticate, postController.createPost);
router.get('/posts/getAllPosts', middleware.authenticate, postController.getAllPosts);
router.get('/posts/getPostById/:id', postController.getPostById);
router.patch('/posts/toggleLike/:id', middleware.authenticate, postController.toggleLike);
router.delete('/posts/deletePostById/:id', postController.deletePostById);

//Comment routes
// router.post('/comments/addComment', middleware.authenticate, commentController.addComment)



module.exports = router;