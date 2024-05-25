const express = require('express');
const router = express.Router();

const {demo} = require('../middlewares/Demo'); 
const {AuthMid} = require('../middlewares/AuthMid');
const {login,signup,resetPassword,otpGenerator,contactUs} = require('../controllers/Auth');

const {dashboard} = require('../controllers/Dashboard');

const {CloudMail,uploadImage} = require('../controllers/Auth');


router.post("/uploader",demo,CloudMail);

router.post("/login",demo,login);
router.post("/signup",demo,signup);

router.put("/otpGenerator",demo,otpGenerator);
router.post("/resetPassword",demo,resetPassword);
router.post("/uploadImage",AuthMid,uploadImage);
router.post("/contactUs",contactUs);

router.post('/dashboard',AuthMid,dashboard);



module.exports = router;