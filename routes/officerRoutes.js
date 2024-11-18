const express = require('express');
const router = express.Router();
const OfficerController = require('../controls/officerControl');

// Route to create a new officer
router.post('/officers', OfficerController.createOfficer);

// Route to get all officers
router.get('/officers', OfficerController.getAllOfficer);

// Route to get an officer by ID
router.get('/officers/:id', OfficerController.getOfficerById);

// Route to update an officer by ID
router.put('/officers/:id', OfficerController.updateOfficer);

// Route to delete an officer by ID
router.delete('/officers/:id', OfficerController.deleteOfficer);

module.exports = router;
