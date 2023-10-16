const User = require("../schemas/user");
const Osc = require("../schemas/org");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const express = require("express");
const router = express.Router();  

const auth = require('../controllers/auth')

//register user
router.post('/userregister', auth.userRegister)
//user login user
router.put('/userlogin', auth.userLogin )

//register osc
router.post('/oscregister', auth.oscRegister)
//osc login
router.put('/osclogin', auth.oscLogin)

module.exports = router
