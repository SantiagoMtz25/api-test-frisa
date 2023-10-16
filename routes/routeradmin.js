const express = require("express");
const router = express.Router()

const adminController = require('../controllers/adminController');


//Get all Osc 
router.get('/getAllOrgs', adminController.getAllOsc);

//Get All users
router.get('/getAllUsers', adminController.getAllUsers)

//register OSC
//router.post('/register', oscController.oscRegister);


module.exports = router
