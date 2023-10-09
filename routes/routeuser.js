const express = require("express");
const router = express.Router()
//const verifyToken = require("../middleware/verify");

const userController = require('../controllers/userController')

//Get All users
router.get('/',userController.getAllUsers)

//Registration
router.post('/register', userController.userRegister)

//Login
router.put('/login', userController.userLogin)

//add favorite
router.patch('/addfav', userController.addFavorite)



module.exports = router