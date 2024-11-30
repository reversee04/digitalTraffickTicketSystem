'use strict';
const asyncHandler = require('express-async-handler');
const { Driver, Ticket, Vehicle } = require('../models');
const Joi = require('joi'); // Optional, for validation
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config(); // Load environment variables from .env file

class DriverController {
  // Validation schema for creating/updating a driver
  static driverValidationSchema = Joi.object({
    name: Joi.string().max(100).required(),
    licenseNumber: Joi.string().max(100).required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).max(100).required(), // Added password validation
    phoneNumber: Joi.string().pattern(/^\d{8,15}$/).optional(),
  });

  // Create a new driver
  static createDriver = asyncHandler(async (req, res) => {
    const { name, licenseNumber, email, password, phoneNumber } = req.body;

    // Validate input data
    const { error } = DriverController.driverValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      const newDriver = await Driver.create({ 
        name, 
        licenseNumber, 
        email, 
        password: hashedPassword, 
        phoneNumber 
      });

      res.status(201).json(newDriver);
    } catch (err) {
      console.error('Error creating driver:', err.message);
      if (err.name === 'SequelizeUniqueConstraintError') {
        return res.status(400).json({ message: 'License number or email already exists' });
      }
      res.status(500).json({ message: 'Failed to create driver', error: err.message });
    }
  });

  // Get all drivers
  static getAllDrivers = asyncHandler(async (req, res) => {
    try {
      const includeRelations = req.query.include === 'true';
      const drivers = await Driver.findAll({
        include: includeRelations
          ? [
              { model: Ticket, as: 'tickets' },
              { model: Vehicle, as: 'vehicles' },
            ]
          : undefined,
      });

      res.status(200).json(drivers);
    } catch (err) {
      console.error('Error fetching drivers:', err.message);
      res.status(500).json({ message: 'Failed to fetch drivers', error: err.message });
    }
  });

  // Get a single driver by ID
  static getDriverById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const includeRelations = req.query.include === 'true';
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
    } catch (err) {
      console.error(`Error fetching driver with ID ${id}:`, err.message);
      res.status(500).json({ message: 'Failed to fetch driver', error: err.message });
    }
  });

  // Update a driver by ID
  static updateDriver = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, licenseNumber, email, password, phoneNumber } = req.body;

    // Validate input data
    const { error } = DriverController.driverValidationSchema.validate(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }

    try {
      // Hash the password if it was updated
      let updatedData = { name, licenseNumber, email, phoneNumber };
      if (password) {
        updatedData.password = await bcrypt.hash(password, 10);
      }

      const [updated] = await Driver.update(updatedData, { where: { id } });

      if (!updated) {
        return res.status(404).json({ message: `Driver with ID ${id} not found` });
      }

      const updatedDriver = await Driver.findByPk(id, {
        include: [
          { model: Ticket, as: 'tickets' },
          { model: Vehicle, as: 'vehicles' },
        ],
      });

      res.status(200).json(updatedDriver);
    } catch (err) {
      console.error(`Error updating driver with ID ${id}:`, err.message);
      res.status(500).json({ message: 'Failed to update driver', error: err.message });
    }
  });

  // Delete a driver by ID
  static deleteDriver = asyncHandler(async (req, res) => {
    const { id } = req.params;

    try {
      const deleted = await Driver.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: `Driver with ID ${id} not found` });
      }

      res.status(200).json({ message: `Driver with ID ${id} deleted successfully` });
    } catch (err) {
      console.error(`Error deleting driver with ID ${id}:`, err.message);
      res.status(500).json({ message: 'Failed to delete driver', error: err.message });
    }
  });

  // Fetch dashboard stats
  static getDashboardStats = asyncHandler(async (req, res) => {
    try {
      const totalTickets = await Ticket.count();
      const paidTickets = await Ticket.count({ where: { status: 'Paid' } });
      const unpaidTickets = totalTickets - paidTickets;

      res.status(200).json({
        totalTickets,
        paidTickets,
        unpaidTickets,
      });
    } catch (err) {
      console.error('Error fetching dashboard stats:', err.message);
      res.status(500).json({ message: 'Failed to fetch dashboard stats', error: err.message });
    }
  });

  // Fetch recent tickets
  static getRecentTickets = asyncHandler(async (req, res) => {
    try {
      const recentTickets = await Ticket.findAll({
        limit: 5,
        order: [['createdAt', 'DESC']],
      });

      res.status(200).json(recentTickets);
    } catch (err) {
      console.error('Error fetching recent tickets:', err.message);
      res.status(500).json({ message: 'Failed to fetch recent tickets', error: err.message });
    }
  });

  // Driver login
  static login = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: 'Email and password are required' });
    }

    try {
      const driver = await Driver.findOne({ where: { email } });

      if (!driver) {
        return res.status(404).json({ message: 'Driver not found' });
      }

      const isPasswordValid = await bcrypt.compare(password, driver.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid email or password' });
      }

      const token = jwt.sign({ id: driver.id }, process.env.JWT_SECRET || 'default_secret_key', { expiresIn: '1d' });

      res.status(200).json({
        message: 'Login successful',
        driver: {
          id: driver.id,
          name: driver.name,
          email: driver.email,
        },
        token,
      });
    } catch (error) {
      console.error('Error during login:', error.message);
      res.status(500).json({ message: 'Login failed', error: error.message });
    }
  });
}

module.exports = DriverController;
