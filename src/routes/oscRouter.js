const express = require("express");
const router = express.Router()

const oscController = require('../controllers/oscController');

//Get All OSC
router.get('/', oscController.getAllOsc);

//register OSC
router.post('/register', oscController.oscRegister);


module.exports = router
