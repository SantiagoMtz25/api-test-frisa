const express = require("express");
const router = express.Router()
const verifyToken = require("../middleware/verify");

const userController = require('../controllers/userController');

//Get All OSC
router.get('/getAllOrgs', [verifyToken],userController.getAllOsc);

//Grade Org
router.patch('/gradeorg/:id?', [verifyToken], userController.orgGrade);

//Add favorites
router.patch('/addFavorite/:id?', [verifyToken], userController.addfavorites)

//Get all fav
router.get('/getUserFavoriteOrganizations', [verifyToken], userController.getAllFav)

//Reomve favorites
router.patch('/removeFavorite/:id?', [verifyToken], userController.removeFavorite)

//User update account
router.patch('/userUpdateAccount', [
    verifyToken
], userController.updateAccount)



module.exports = router

