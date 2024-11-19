// routes/driverRoutes.js
const express = require('express');
const router = express.Router();
const DriverController = require('../controls/driverControl');

// Route to create a new driver
router.post('/drivers', DriverController.createDriver);

// Route to get all drivers
router.get('/drivers', DriverController.getAllDrivers);

// Route to get a single driver by ID
router.get('/drivers/:id', DriverController.getDriverById);

// Route to update a driver by ID
router.put('/drivers/:id', DriverController.updateDriver);

// Route to delete a driver by ID
router.delete('/drivers/:id', DriverController.deleteDriver);

module.exports = router;
