const express = require("express");
const router = express.Router()
const verifyToken = require("../middleware/verify");


const oscController = require('../controllers/oscController');

//Get All OSC
router.get('/getAll/:name?', oscController.getAllOsc);

//Update osc
router.patch('/update_org', [verifyToken], oscController.orgUpdateAcount);


module.exports = router
