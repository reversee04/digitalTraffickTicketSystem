const asyncHandler = require('express-async-handler');
const { Ticket, Driver, Officer, Violation, Payment } = require('../models');

class TicketController {
  // Create a new ticket
  static createTicket = asyncHandler(async (req, res) => {
    try {
      const { status, paymentStatus, officerId, driverId, violationId } = req.body;

      // Validate the request body
      if (!status || !paymentStatus || !officerId || !driverId || !violationId) {
        return res.status(400).json({ message: 'Please fill in all fields except date' });
      }

      // Automatically set the date to the current date and time
      const date = new Date();

      // Create the ticket
      const newTicket = await Ticket.create({
        date,
        status,
        paymentStatus,
        officerId,
        driverId,
        violationId,
      });

      res.status(201).json(newTicket);
    } catch (error) {
      console.error('Error creating ticket:', error.message);
      res.status(500).json({
        message: 'Failed to create ticket',
        error: error.message,
      });
    }
  });

  // Get all tickets
  static getAllTickets = asyncHandler(async (req, res) => {
    try {
      const tickets = await Ticket.findAll({
        include: [
          { model: Driver, as: 'driver' },
          { model: Officer, as: 'officer' },
          { model: Violation, as: 'violation' },
          { model: Payment, as: 'payment' },
        ],
      });

      if (tickets.length === 0) {
        return res.status(404).json({ message: 'No tickets found' });
      }

      res.status(200).json(tickets);
    } catch (error) {
      console.error('Error getting all tickets:', error.message);
      res.status(500).json({
        message: 'Failed to get all tickets',
        error: error.message,
      });
    }
  });

  // Get a ticket by ID
  static getTicketById = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      const ticket = await Ticket.findByPk(id, {
        include: [
          { model: Driver, as: 'driver' },
          { model: Officer, as: 'officer' },
          { model: Violation, as: 'violation' },
          { model: Payment, as: 'payment' },
        ],
      });

      if (!ticket) {
        return res.status(404).json({ message: `Ticket with ID ${id} not found` });
      }

      res.status(200).json(ticket);
    } catch (error) {
      console.error(`Error getting ticket with ID ${id}:`, error.message);
      res.status(500).json({
        message: 'Failed to get ticket',
        error: error.message,
      });
    }
  });

  // Update a ticket by ID
  static updateTicket = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;
      const { status, paymentStatus, officerId, driverId, violationId } = req.body;

      // Validate the request body
      if (!status || !paymentStatus || !officerId || !driverId || !violationId) {
        return res.status(400).json({ message: 'Please fill in all fields except date' });
      }

      // Automatically set the date to the current date and time
      const date = new Date();

      // Update the ticket
      const [updated] = await Ticket.update(
        { date, status, paymentStatus, officerId, driverId, violationId },
        { where: { id } }
      );

      if (!updated) {
        return res.status(404).json({ message: `Ticket with ID ${id} not found` });
      }

      // Fetch the updated ticket
      const updatedTicket = await Ticket.findByPk(id, {
        include: [
          { model: Driver, as: 'driver' },
          { model: Officer, as: 'officer' },
          { model: Violation, as: 'violation' },
          { model: Payment, as: 'payment' },
        ],
      });

      res.status(200).json(updatedTicket);
    } catch (error) {
      console.error(`Error updating ticket with ID ${id}:`, error.message);
      res.status(500).json({
        message: 'Failed to update ticket',
        error: error.message,
      });
    }
  });

  // Delete a ticket by ID
  static deleteTicket = asyncHandler(async (req, res) => {
    try {
      const { id } = req.params;

      // Attempt to delete the ticket
      const deleted = await Ticket.destroy({ where: { id } });
      if (!deleted) {
        return res.status(404).json({ message: `Ticket with ID ${id} not found` });
      }

      res.status(200).json({ message: `Ticket with ID ${id} deleted successfully` });
    } catch (error) {
      console.error(`Error deleting ticket with ID ${id}:`, error.message);
      res.status(500).json({
        message: 'Failed to delete ticket',
        error: error.message,
      });
    }
  });
}

module.exports = TicketController;
