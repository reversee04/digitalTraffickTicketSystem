const asyncHandler = require('express-async-handler');
const { Violation, Ticket } = require('../models');

class ViolationController {
  // Create a new violation
  static createViolation = asyncHandler(async (req, res) => {
    try {
      const { description, fineAmount } = req.body;

      // Validate the request body
      if (!description || !fineAmount) {
        return res.status(400).json({ message: 'Please fill in all fields' });
      }

      // Create the violation
      const newViolation = await Violation.create({ description, fineAmount });
      res.status(201).json(newViolation);
    } catch (error) {
      console.error('Error creating violation:', error.message);
      res.status(500).json({
        message: 'Failed to create violation',
        error: error.message,
      });
    }
  });

  // Get all violations
  static getAllViolations = asyncHandler(async (req, res) => {
    try {
      const violations = await Violation.findAll({
        include: [{ model: Ticket, as: 'tickets' }] // Include associated tickets
      });

      if (violations.length === 0) {
        return res.status(404).json({ message: 'No violations found' });
      }
      res.status(200).json(violations);
    } catch (error) {
      console.error('Error getting all violations:', error.message);
      res.status(500).json({
        message: 'Failed to get all violations',
        error: error.message,
      });
    }
  });

  // Get a violation by ID
  static getViolationById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      const violation = await Violation.findByPk(id, {
        include: [{ model: Ticket, as: 'tickets' }] // Include associated tickets
      });
      
      if (!violation) {
        return res.status(404).json({ message: `Violation with ID ${id} not found` });
      }
      res.status(200).json(violation);
    } catch (error) {
      console.error(`Error getting violation with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        message: `Failed to get violation with ID ${req.params.id}`,
        error: error.message,
      });
    }
  });

  // Update a violation by ID
  static updateViolation = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { description, fineAmount } = req.body;

      // Validate the request body
      if (!description || !fineAmount) {
        return res.status(400).json({ message: 'Please fill in all fields' });
      }

      // Update the violation
      const [updated] = await Violation.update(
        { description, fineAmount },
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).json({ message: `Violation with ID ${id} not found` });
      }

      // Fetch the updated violation along with its associated tickets
      const updatedViolation = await Violation.findByPk(id, {
        include: [{ model: Ticket, as: 'tickets' }] // Include associated tickets
      });
      res.status(200).json(updatedViolation);
    } catch (error) {
      console.error(`Error updating violation with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        message: 'Failed to update violation',
        error: error.message,
      });
    }
  });

  // Delete a violation by ID
  static deleteViolation = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      // Attempt to delete the violation
      const deleted = await Violation.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: `Violation with ID ${id} not found` });
      }

      res.status(200).json({ message: `Violation with ID ${id} deleted successfully` });
    } catch (error) {
      console.error(`Error deleting violation with ID ${req.params.id}:`, error.message);
      res.status(500).json({
        message: 'Failed to delete violation',
        error: error.message,
      });
    }
  });
}

module.exports = ViolationController;
