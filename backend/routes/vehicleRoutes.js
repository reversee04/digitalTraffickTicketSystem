const express = require('express');
const router = express.Router();
const VehicleController = require('../controls/vehicleControl');

// Route to create a new vehicle
router.post('/vehicles', VehicleController.createVehicle);

// Route to get all vehicles
router.get('/vehicles', VehicleController.getAllVehicles);

// Route to get a single vehicle by ID
router.get('/vehicles/:id', VehicleController.getVehicleById);

// Route to update a vehicle by ID
router.put('/vehicles/:id', VehicleController.updateVehicle);

// Route to delete a vehicle by ID
router.delete('/vehicles/:id', VehicleController.deleteVehicle);

module.exports = router;
