const express = require('express');
const router = express.Router();
const TicketController = require('../controls/ticketControl');

// Create a new ticket
router.post('/tickets', TicketController.createTicket);

// Get all tickets
router.get('/tickets', TicketController.getAllTickets);

// Get a ticket by ID
router.get('/tickets/:id', TicketController.getTicketById);

// Update a ticket by ID
router.put('/tickets/:id', TicketController.updateTicket);

// Delete a ticket by ID
router.delete('/tickets/:id', TicketController.deleteTicket);

module.exports = router;
