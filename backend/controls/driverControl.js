const asyncHandler = require('express-async-handler');
const { Driver, Ticket, Vehicle } = require('../models');

class DriverController {
  // Create a new driver
  static createDriver = asyncHandler(async (req, res) => {
    try {
      const { name, licenseNumber, contactInfo } = req.body;

      // Validate request body
      if (!name || !licenseNumber || !contactInfo) {
        return res.status(400).json({ message: 'All fields are required' });
      }

      // Create a new driver
      const newDriver = await Driver.create({ name, licenseNumber, contactInfo });
      res.status(201).json(newDriver);
    } catch (error) {
      console.error('Error creating driver:', error.message);
      res.status(500).json({
        message: 'Failed to create driver',
        error: error.message,
      });
    }
  });

  // Get all drivers with optional inclusion of related entities
  static getAllDrivers = asyncHandler(async (req, res) => {
    try {
      const includeRelations = req.query.include === 'true'; // Optional query to include related data

      const drivers = await Driver.findAll({
        include: includeRelations
          ? [
              { model: Ticket, as: 'tickets' },
              { model: Vehicle, as: 'vehicles' },
            ]
          : undefined,
      });

      if (drivers.length === 0) {
        return res.status(404).json({ message: 'No drivers found' });
      }

      res.status(200).json(drivers);
    } catch (error) {
      console.error('Error fetching drivers:', error.message);
      res.status(500).json({
        message: 'Failed to fetch drivers',
        error: error.message,
      });
    }
  });

  // Get a single driver by ID with related entities
  static getDriverById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const includeRelations = req.query.include === 'true'; // Optional query to include related data

      // Check if the driver exists
      const driver = await Driver.findByPk(id, {
        include: includeRelations
          ? [
              { model: Ticket, as: 'tickets' },
              { model: Vehicle, as: 'vehicles' },
            ]
          : undefined,
      });

      if (!driver) {
        return res.status(404).json({ message: `Driver with ID ${id} not found` });
      }

      res.status(200).json(driver);
    } catch (error) {
      console.error(`Error fetching driver with ID ${id}:`, error.message);
      res.status(500).json({
        message: 'Failed to fetch driver',
        error: error.message,
      });
    }
  });

  // Update a driver by ID
  static updateDriver = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { name, licenseNumber, contactInfo } = req.body;

      // Validate request body
      if (!name || !licenseNumber || !contactInfo) {
        return res.status(400).json({ message: 'All fields are required for update' });
      }

      // Attempt to update the driver
      const [updated] = await Driver.update(
        { name, licenseNumber, contactInfo },
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).json({ message: `Driver with ID ${id} not found` });
      }

      // Fetch the updated driver
      const updatedDriver = await Driver.findByPk(id, {
        include: [
          { model: Ticket, as: 'tickets' },
          { model: Vehicle, as: 'vehicles' },
        ],
      });

      res.status(200).json(updatedDriver);
    } catch (error) {
      console.error(`Error updating driver with ID ${id}:`, error.message);
      res.status(500).json({
        message: 'Failed to update driver',
        error: error.message,
      });
    }
  });

  // Delete a driver by ID along with their tickets and vehicles
  static deleteDriver = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      // Attempt to delete the driver
      const deleted = await Driver.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: `Driver with ID ${id} not found` });
      }

      res.status(200).json({ message: `Driver with ID ${id} deleted successfully` });
    } catch (error) {
      console.error(`Error deleting driver with ID ${id}:`, error.message);
      res.status(500).json({
        message: 'Failed to delete driver',
        error: error.message,
      });
    }
  });
}

module.exports = DriverController;
