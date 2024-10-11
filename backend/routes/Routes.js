const express = require("express");
const { signUp, login } = require("../controllers/authController");
const { middleware } = require("../middleware/middleware");
const { createPost, likePost, commentPost } = require("../controllers/postController");
const { sendConnection, connectionStatus, removeRequest, addConnection } = require("../controllers/connectionController");
const { fetchFeed, fetchUserDetails } = require("../controllers/dataController");
const router = express.Router();

router.post('/api/auth/signup',signUp);
router.post('/api/auth/login',login);
router.post('/api/createPost',middleware,createPost);
router.post('/api/likePost',middleware,likePost);
router.post('/api/commentPost',middleware,commentPost);
router.post('/api/sendReq',middleware,sendConnection);
router.post('/api/addReq',middleware,addConnection);

router.post('/api/checkReq',middleware,connectionStatus);
router.post('/api/removeReq',middleware,removeRequest);
router.post('/api/fetchFeed',middleware,fetchFeed);
router.post('/api/fetchUser',middleware,fetchUserDetails);








module.exports = router