const asyncHandler = require('express-async-handler');
const { Vehicle, Driver } = require('../models');

class VehicleController {
  // Create a new vehicle
  static createVehicle = asyncHandler(async (req, res) => {
    try {
      const { licensePlate, model, color, driverId } = req.body;

      // Validate request body
      if (!licensePlate || !model || !color) {
        return res.status(400).json({ message: 'License plate, model, and color are required' });
      }

      // Check if the driver exists
      if (driverId) {
        const driver = await Driver.findByPk(driverId);
        if (!driver) {
          return res.status(404).json({ message: `Driver with ID ${driverId} not found` });
        }
      }

      // Create a new vehicle
      const newVehicle = await Vehicle.create({ licensePlate, model, color, driverId });
      res.status(201).json(newVehicle);
    } catch (error) {
      console.error('Error creating vehicle:', error.message);
      res.status(500).json({
        message: 'Failed to create vehicle',
        error: error.message,
      });
    }
  });

  // Get all vehicles
  static getAllVehicles = asyncHandler(async (req, res) => {
    try {
      const vehicles = await Vehicle.findAll({
        include: [
          {
            model: Driver,
            as: 'driver',
            attributes: ['id', 'name', 'licenseNumber'], // Adjust fields as needed
          },
        ],
      });
      if (vehicles.length === 0) {
        return res.status(404).json({ message: 'No vehicles found' });
      }
      res.status(200).json(vehicles);
    } catch (error) {
      console.error('Error fetching vehicles:', error.message);
      res.status(500).json({
        message: 'Failed to fetch vehicles',
        error: error.message,
      });
    }
  });

  // Get a single vehicle by ID
  static getVehicleById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      // Check if the vehicle exists
      const vehicle = await Vehicle.findByPk(id, {
        include: [
          {
            model: Driver,
            as: 'driver',
            attributes: ['id', 'name', 'licenseNumber'], // Adjust fields as needed
          },
        ],
      });
      if (!vehicle) {
        return res.status(404).json({ message: `Vehicle with ID ${id} not found` });
      }

      res.status(200).json(vehicle);
    } catch (error) {
      console.error(`Error fetching vehicle with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        message: 'Failed to fetch vehicle',
        error: error.message,
      });
    }
  });

  // Update a vehicle by ID
  static updateVehicle = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { licensePlate, model, color, driverId } = req.body;

      // Validate request body
      if (!licensePlate || !model || !color) {
        return res.status(400).json({ message: 'License plate, model, and color are required for update' });
      }

      // Check if the driver exists if driverId is provided
      if (driverId) {
        const driver = await Driver.findByPk(driverId);
        if (!driver) {
          return res.status(404).json({ message: `Driver with ID ${driverId} not found` });
        }
      }

      // Attempt to update the vehicle
      const [updated] = await Vehicle.update(
        { licensePlate, model, color, driverId },
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).json({ message: `Vehicle with ID ${id} not found` });
      }

      // Fetch the updated vehicle
      const updatedVehicle = await Vehicle.findByPk(id, {
        include: [
          {
            model: Driver,
            as: 'driver',
            attributes: ['id', 'name', 'licenseNumber'], // Adjust fields as needed
          },
        ],
      });
      res.status(200).json(updatedVehicle);
    } catch (error) {
      console.error(`Error updating vehicle with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        message: 'Failed to update vehicle',
        error: error.message,
      });
    }
  });

  // Delete a vehicle by ID
  static deleteVehicle = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      // Attempt to delete the vehicle
      const deleted = await Vehicle.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: `Vehicle with ID ${id} not found` });
      }

      res.status(200).json({ message: `Vehicle with ID ${id} deleted successfully` });
    } catch (error) {
      console.error(`Error deleting vehicle with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        message: 'Failed to delete vehicle',
        error: error.message,
      });
    }
  });
}

module.exports = VehicleController;
