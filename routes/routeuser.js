const express = require("express");
const router = express.Router()
const verifyToken = require("../middleware/verify");

const userController = require('../controllers/userController');

//Get All OSC
router.get('/getAll', [verifyToken],userController.getAllOsc);

//Grade Org
router.patch('/gradeorg', [verifyToken], userController.orgGrade);

//Add favorites
router.patch('/addFavorite', [verifyToken], userController.addfavorites)

//Get all fav
router.get('/getUserFavoriteOrganizations', [verifyToken], userController.getAllFav)

//Reomve favorites
router.patch('/removeFavorite', [verifyToken], userController.removeFavorite)

//User update account
router.patch('/userUpdateAccount', [
    verifyToken
], userController.updateAccount)



module.exports = router

