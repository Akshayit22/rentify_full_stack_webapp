const express = require('express');
const router = express.Router();

const {AuthMid} = require('../middlewares/AuthMid');

const {updateProfile,getUserDetails} = require('../controllers/Profile');
const {saveBlog, getUpdatedUser} = require("../controllers/Profile");


router.put('/updateProfile',AuthMid,updateProfile);
router.post('/getUserDetails',AuthMid,getUserDetails);
router.post('/getUpdatedUser', AuthMid, getUpdatedUser);
router.put('/saveBlog',AuthMid,saveBlog);

module.exports = router;