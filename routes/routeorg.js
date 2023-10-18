const express = require("express");
const router = express.Router()
const verifyToken = require("../middleware/verify");


const oscController = require('../controllers/oscController');

//Update osc acount
router.patch('/orgUpdateAccount', [
    verifyToken
], oscController.orgUpdateAcount);

//Osc get grade
router.get('/getgrade',[verifyToken],oscController.getGrade)




module.exports = router
