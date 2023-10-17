const express = require("express");
const router = express.Router();
const cors = require('cors');

const adminController = require('../controllers/adminController');


//Get all Osc 
router.get('/getAllOrgs', cors({ origin: 'http://localhost:5173' }), adminController.getAllOsc);

//Get All users
router.get('/getAllUsers', cors({ origin: 'http://localhost:5173' }), adminController.getAllUsers)

//register OSC
//router.post('/register', oscController.oscRegister);


module.exports = router
