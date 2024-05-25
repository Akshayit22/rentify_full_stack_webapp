const express = require('express');
const router = express.Router();


const {AuthMid} = require('../middlewares/AuthMid');

const {createComment} = require('../controllers/Comment');
const {updateComment,deleteComment} = require('../controllers/Comment');




router.post('/createComment',AuthMid,createComment);
router.post('/updateComment',AuthMid,updateComment);
router.put('/deleteComment',AuthMid,deleteComment);





module.exports = router;