const express = require('express');
const router = express.Router();
const ViolationController = require('../controls/violationControl');

// Create a new violation
router.post('/violations', ViolationController.createViolation);

// Get all violations
router.get('/violations', ViolationController.getAllViolations);

// Get a violation by ID
router.get('/violations/:id', ViolationController.getViolationById);

// Update a violation by ID
router.put('/violations/:id', ViolationController.updateViolation);

// Delete a violation by ID
router.delete('/violations/:id', ViolationController.deleteViolation);

module.exports = router;
