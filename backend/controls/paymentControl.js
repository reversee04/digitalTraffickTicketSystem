const asyncHandler = require('express-async-handler');
const { Payment, Ticket } = require('../models');

class PaymentController {
  // Create a new payment
  static createPayment = asyncHandler(async (req, res) => {
    const { amount, status, paymentMethod, ticketId } = req.body;

    // Validate request body
    if (!amount || !status || !paymentMethod || !ticketId) {
      return res.status(400).json({ message: 'Please fill in all fields except date' });
    }

    // Ensure the ticket exists
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: `Ticket with ID ${ticketId} not found` });
    }

    // Automatically set the date to the current date and time
    const date = new Date();

    // Create payment
    const payment = await Payment.create({ amount, status, paymentMethod, ticketId, date });
    res.status(201).json(payment);
  });

  // Get all payments
  static getAllPayments = asyncHandler(async (req, res) => {
    const payments = await Payment.findAll({
      include: { model: Ticket, as: 'ticket' }, // Include associated ticket
    });

    if (!payments.length) {
      return res.status(404).json({ message: 'No payments found' });
    }

    res.status(200).json(payments);
  });

  // Get payment by ID
  static getPaymentById = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const payment = await Payment.findByPk(id, {
      include: { model: Ticket, as: 'ticket' }, // Include associated ticket
    });

    if (!payment) {
      return res.status(404).json({ message: `Payment with ID ${id} not found` });
    }

    res.status(200).json(payment);
  });

  // Update payment by ID
  static updatePayment = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { amount, status, paymentMethod, ticketId } = req.body;

    // Validate request body
    if (!amount || !status || !paymentMethod || !ticketId) {
      return res.status(400).json({ message: 'Please fill in all fields except date' });
    }

    // Ensure the ticket exists
    const ticket = await Ticket.findByPk(ticketId);
    if (!ticket) {
      return res.status(404).json({ message: `Ticket with ID ${ticketId} not found` });
    }

    // Automatically set the date to the current date and time
    const date = new Date();

    // Attempt to update payment
    const [updated] = await Payment.update(
      { amount, status, paymentMethod, ticketId, date },
      { where: { id } }
    );

    if (!updated) {
      return res.status(404).json({ message: `Payment with ID ${id} not found` });
    }

    // Fetch the updated payment
    const updatedPayment = await Payment.findByPk(id, {
      include: { model: Ticket, as: 'ticket' },
    });
    res.status(200).json(updatedPayment);
  });

  // Delete payment by ID
  static deletePayment = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // Attempt to delete payment
    const deleted = await Payment.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).json({ message: `Payment with ID ${id} not found` });
    }

    res.status(200).json({ message: `Payment with ID ${id} deleted successfully` });
  });
}

module.exports = PaymentController;
