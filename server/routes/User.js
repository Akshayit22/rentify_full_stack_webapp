const express = require('express');
const router = express.Router();

const {AuthMid} = require('../middlewares/AuthMid');
const {login,signup,resetPassword,otpGenerator} = require('../controllers/Auth');

const {dashboard,likeOrDislike,intrested} = require('../controllers/Dashboard');



router.post("/login",login);
router.post("/signup",signup);

router.put("/otpGenerator",otpGenerator);
router.post("/resetPassword",resetPassword);

router.post('/dashboard',AuthMid,dashboard);

router.put('/likeOrDislike',AuthMid,likeOrDislike);
router.put('/intrested',AuthMid,intrested);


module.exports = router;