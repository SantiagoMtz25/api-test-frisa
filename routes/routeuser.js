const express = require("express");
const router = express.Router()
const verifyToken = require("../middleware/verify");

const userController = require('../controllers/userController')

//Get All users
router.get('/:userName?',userController.getAllUsers)

//Org grade
router.patch('/grade_org', [verifyToken] ,userController.orgGrade);

//Add favorites
router.patch('/add_favorites', [verifyToken], userController.addfavorites)

module.exports = router

