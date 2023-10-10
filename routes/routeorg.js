const express = require("express");
const router = express.Router()

const oscController = require('../controllers/oscController');

//Get All OSC
router.get('/getAll/:name?', oscController.getAllOsc);

//Org grade
router.patch('/grade_org', oscController.orgGrade);

//register OSC
router.post('/register', oscController.oscRegister);

//Update osc
router.patch('/update_org', oscController.orgUpdateAcount);

//login Osc
router.put('/login', oscController.oscLogin);


module.exports = router
