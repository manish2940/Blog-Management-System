import express from 'express';
import signupUser from '../controller/user-controller.js';
import { loginUserData } from '../controller/user-controller.js';
import { uploadImage } from '../controller/user-controller.js';
import upload from '../utils/upload.js';
import getImage from '../controller/image-controller.js';
import { createPost } from '../controller/user-controller.js';
import { getAllPosts } from '../controller/user-controller.js';
import { getPost } from '../controller/user-controller.js';
import { newComment } from '../controller/post-comment-controller.js';
import { updatePost } from '../controller/user-controller.js';
import { deleteComment } from '../controller/post-comment-controller.js';
import { deletePost } from '../controller/post-comment-controller.js';
import { getComments } from '../controller/post-comment-controller.js';
const router = express.Router();
router.post('/signup',(req,res)=>{
    console.log("signup router called");
    console.log(req);
    console.log(req.body);
    // res.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    // res.set('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // res.set('Access-Control-Allow-Headers', 'Authorization, Content-Type');
    // res.set('Access-Control-Max-Age', '86400');
    signupUser(req,res);
});
router.get('/signup',(req,res)=>{
    
});
router.post('/login',(req,res)=>{
    console.log("you called the login router");
    loginUserData(req,res);

})
router.post('/file/upload',upload.single('file'),uploadImage);
router.get('/file/:filename',getImage);
router.post('/create',createPost);
router.get('/posts',getAllPosts);
router.get('/post/:id',getPost);
router.post('/comment/new', newComment);
router.get('/comments/:id', getComments);
router.delete('/comment/delete/:id',  deleteComment);
router.put('/update/:id',  updatePost);
router.delete('/delete/:id', deletePost);
export default router;