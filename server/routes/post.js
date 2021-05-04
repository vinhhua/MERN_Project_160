/*
  Post Route

*/

//  acquire router
const express = require("express");
const router = express.Router();

//  acquire Post controller functions
const { 
    getPosts, 
    getPost, 
    createPost,
    updatePost,
    deletePost
} = require("../controllers/post");

//  set-up router: GET, POST, DELETE, & UPDATE
router.get('/', getPosts);
router.post('/', createPost);
router.get('/:id', getPost);
router.patch('/:id', updatePost);
router.delete('/:id', deletePost);

//  export default router
module.exports = router;