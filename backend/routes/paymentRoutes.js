const express = require('express');
const router = express.Router();
const PaymentController = require('../controls/paymentControl');

// Create a new payment
router.post('/payments', PaymentController.createPayment);

// Get all payments
router.get('/payments', PaymentController.getAllPayments);

// Get a payment by ID
router.get('/payments/:id', PaymentController.getPaymentById);

// Update a payment by ID
router.put('/payments/:id', PaymentController.updatePayment);

// Delete a payment by ID
router.delete('/payments/:id', PaymentController.deletePayment);

module.exports = router;
