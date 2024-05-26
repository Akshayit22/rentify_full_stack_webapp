const express = require('express');
const router = express.Router();

const {AuthMid} = require('../middlewares/AuthMid');
const {login,signup,resetPassword,otpGenerator} = require('../controllers/Auth');

const {dashboard} = require('../controllers/Dashboard');



router.post("/login",demo,login);
router.post("/signup",demo,signup);

router.put("/otpGenerator",demo,otpGenerator);
router.post("/resetPassword",demo,resetPassword);

router.post('/dashboard',AuthMid,dashboard);



module.exports = router;