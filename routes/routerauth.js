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
router.put('/user_login', auth.userLogin )
//register osc
router.post('/osc_register', auth.oscRegister)
//osc login
router.put('/osc_login', auth.oscLogin)

module.exports = router
