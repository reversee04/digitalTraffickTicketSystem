const asyncHandler = require('express-async-handler');
const bcrypt = require('bcryptjs');
const { Officer } = require('../models');
const jwt = require('jsonwebtoken');

class OfficerController {
  // Create a new officer
  static createOfficer = asyncHandler(async (req, res) => {
    try {
      const { name, badgeNumber, department, password } = req.body;

      // Validate request body
      if (!name || !badgeNumber || !department || !password) {
        return res.status(400).json({ message: 'Please fill in all fields' });
      }

      // Hash the password before saving to the database
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create the officer
      const newOfficer = await Officer.create({ name, badgeNumber, department, password: hashedPassword });
      res.status(201).json(newOfficer);
    } catch (error) {
      console.error('Error creating officer:', error.message);
      res.status(500).json({
        message: 'Failed to create officer',
        error: error.message,
      });
    }
  });

  // Get all officers
  static getAllOfficer = asyncHandler(async (req, res) => {
    try {
      const officers = await Officer.findAll();
      if (officers.length === 0) {
        return res.status(404).json({ message: 'No officers found' });
      }
      res.status(200).json(officers);
    } catch (error) {
      console.error('Error getting all officers:', error.message);
      res.status(500).json({
        message: 'Failed to get all officers',
        error: error.message,
      });
    }
  });

  // Get an officer by ID
  static getOfficerById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      const officer = await Officer.findByPk(id);
      if (!officer) {
        return res.status(404).json({ message: `Officer with ID ${id} not found` });
      }
      res.status(200).json(officer);
    } catch (error) {
      console.error(`Error getting officer with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        message: `Failed to get officer with ID ${req.params.id}`,
        error: error.message,
      });
    }
  });

  // Update officer by ID
  static updateOfficer = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { name, badgeNumber, department, password } = req.body;

      // Validate request body
      if (!name || !badgeNumber || !department) {
        return res.status(400).json({ message: 'Please fill in all fields' });
      }

      let updatedOfficerData = { name, badgeNumber, department };

      // If password is provided, hash it before updating
      if (password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        updatedOfficerData.password = hashedPassword;
      }

      // Update the officer
      const [updated] = await Officer.update(updatedOfficerData, { where: { id } });

      if (!updated) {
        return res.status(404).json({ message: `Officer with ID ${id} not found` });
      }

      // Fetch the updated officer
      const updatedOfficer = await Officer.findByPk(id);
      res.status(200).json(updatedOfficer);
    } catch (error) {
      console.error(`Error updating officer with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        message: 'Failed to update officer',
        error: error.message,
      });
    }
  });

  // Delete an officer by ID
  static deleteOfficer = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      // Delete the officer
      const deleted = await Officer.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: `Officer with ID ${id} not found` });
      }

      res.status(200).json({ message: `Officer with ID ${id} deleted successfully` });
    } catch (error) {
      console.error(`Error deleting officer with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        message: 'Failed to delete officer',
        error: error.message,
      });
    }
  });

  static loginOfficer = asyncHandler(async (req, res) => {
    try {
      const { username, password } = req.body;

      if (!username || !password) {
        return res.status(400).json({ message: 'Please provide both username and password' });
      }

      const officer = await Officer.findOne({ where: { username } });
      if (!officer) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const isPasswordValid = await bcrypt.compare(password, officer.password);
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign(
        { id: officer.id, name: officer.name, department: officer.department },
        process.env.JWT_SECRET || 'default_secret_key', // Use environment variable
        { expiresIn: '1h' }
      );

      const officerData = {
        id: officer.id,
        name: officer.name,
        department: officer.department,
      };

      res.status(200).json({ message: 'Login successful', token, officer: officerData });
    } catch (error) {
      console.error('Error logging in officer:', error.message);
      res.status(500).json({ message: 'Failed to log in officer', error: error.message });
    }
  });
}

module.exports = OfficerController;
