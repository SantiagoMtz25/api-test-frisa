const express = require("express");
const router = express.Router();

const adminController = require('../controllers/adminController');

// Get all OSCs
router.get('/getAllOrgs', adminController.getAllOsc);

// Get all users
router.get('/getAllUsers', adminController.getAllUsers);

// Accept an OSC request
router.put('/acceptOsc/:id?', adminController.acceptOsc);

// Reject an OSC request
router.delete('/rejectOsc/:id?', adminController.rejectOsc);

// Edit an OSC request
//router.put('/editOsc/:id', adminController.editOsc);

// Upload Excel 
//router.post('/uploadExcelOsc', adminController.uploadExcelOsc);

// Get a specific OSC request by its ID
//router.get('/getOsc/:id', adminController.getOscById);

module.exports = router;

