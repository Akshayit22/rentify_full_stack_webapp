const express = require('express');
const router = express.Router();


const {AuthMid} = require('../middlewares/AuthMid');

const {createProperty, updateProperty, deleteProperty, getProperty, getAllProperty} = require('../controllers/Property');



router.post('/createProperty',AuthMid,createProperty);
router.put('/updateProperty',AuthMid,updateProperty);

router.get('/getAllProperty',getAllProperty);
router.get('/getProperty/:id',getProperty);

router.put('/deleteProperty',AuthMid,deleteProperty);


module.exports = router;