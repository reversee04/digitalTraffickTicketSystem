const asyncHandler = require('express-async-handler');
const { Officer } = require('../models');

class OfficerController {
  // Create a new officer
  static createOfficer = asyncHandler(async (req, res) => {
    try {
      const { name, badgeNumber, department } = req.body;

      // Validate request body
      if (!name || !badgeNumber || !department) {
        return res.status(400).json({ message: 'Please fill in all fields' });
      }

      // Create the officer
      const newOfficer = await Officer.create({ name, badgeNumber, department });
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
      const { name, badgeNumber, department } = req.body;

      // Validate request body
      if (!name || !badgeNumber || !department) {
        return res.status(400).json({ message: 'Please fill in all fields' });
      }

      // Update the officer
      const [updated] = await Officer.update(
        { name, badgeNumber, department },
        { where: { id } }
      );

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
}

module.exports = OfficerController;
