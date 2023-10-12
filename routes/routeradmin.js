const express = require("express");
const router = express.Router()

const oscController = require('../controllers/oscController');


//Login 
router.get('/getAll', oscController.getAllOsc);

//register OSC
//router.post('/register', oscController.oscRegister);


module.exports = router
