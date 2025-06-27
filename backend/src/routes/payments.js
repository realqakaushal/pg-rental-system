const express = require('express');
const router = express.Router();
const Payment = require('../models/Payment');
const { authenticate } = require('../middleware/auth');

// Process a payment (public for demo, would be authenticated in production)
router.post('/', async (req, res) => {
  try {
    const {
      applicationId,
      amount,
      paymentMethod,
      transactionId
    } = req.body;

    // For demo purposes, using a mock userId
    const userId = req.body.userId || 'demo-user-1';
    
    const currentDate = new Date();
    const paymentData = {
      applicationId,
      userId,
      amount,
      paymentMethod,
      transactionId: transactionId || (paymentMethod === 'cash' ? `CASH${Date.now()}` : `TXN${Date.now()}`),
      paymentMonth: currentDate.getMonth() + 1,
      paymentYear: currentDate.getFullYear(),
      status: paymentMethod === 'cash' ? 'pending' : 'completed'
    };

    const payment = await Payment.create(paymentData);
    
    res.status(201).json({
      success: true,
      data: payment,
      message: 'Payment processed successfully'
    });
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to process payment' 
    });
  }
});

// Get payment history for a user (public for demo)
router.get('/user/:userId', async (req, res) => {
  try {
    // For demo purposes, return mock payment history
    const mockPayments = [
      {
        id: 1,
        application_id: 1,
        room_number: '101',
        property_name: 'Green Valley PG',
        amount: 8899,
        payment_method: 'upi',
        transaction_id: 'TXN1234567890',
        payment_month: 1,
        payment_year: 2024,
        status: 'completed',
        created_at: '2024-01-05T10:30:00Z'
      },
      {
        id: 2,
        application_id: 1,
        room_number: '101',
        property_name: 'Green Valley PG',
        amount: 8899,
        payment_method: 'card',
        transaction_id: 'TXN1234567891',
        payment_month: 12,
        payment_year: 2023,
        status: 'completed',
        created_at: '2023-12-05T14:20:00Z'
      }
    ];

    res.json({ 
      success: true, 
      data: mockPayments 
    });
  } catch (error) {
    console.error('Error fetching payment history:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch payment history' 
    });
  }
});

// Get payment summary for a user (public for demo)
router.get('/user/:userId/summary', async (req, res) => {
  try {
    const mockSummary = {
      total_payments: 12,
      total_amount: 106788,
      last_payment_date: '2024-01-05T10:30:00Z',
      pending_payments: 0
    };

    res.json({ 
      success: true, 
      data: mockSummary 
    });
  } catch (error) {
    console.error('Error fetching payment summary:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch payment summary' 
    });
  }
});

// Get pending payments for a user (public for demo)
router.get('/user/:userId/pending', async (req, res) => {
  try {
    const mockPendingPayments = [
      {
        application_id: 1,
        room_id: 1,
        room_number: '101',
        monthly_rent: 8000,
        property_name: 'Green Valley PG',
        payment_status: 'pending',
        due_date: new Date(new Date().getFullYear(), new Date().getMonth() + 1, 5).toISOString()
      }
    ];

    res.json({ 
      success: true, 
      data: mockPendingPayments 
    });
  } catch (error) {
    console.error('Error fetching pending payments:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to fetch pending payments' 
    });
  }
});

// Get payment receipt (public for demo)
router.get('/:paymentId/receipt', async (req, res) => {
  try {
    const mockReceipt = {
      payment_id: req.params.paymentId,
      transaction_id: 'TXN1234567890',
      amount: 8899,
      payment_date: '2024-01-05T10:30:00Z',
      property_name: 'Green Valley PG',
      room_number: '101',
      tenant_name: 'John Doe',
      payment_method: 'UPI',
      month_year: 'January 2024',
      breakdown: {
        monthly_rent: 8000,
        maintenance_charges: 800,
        processing_fee: 99
      }
    };

    res.json({ 
      success: true, 
      data: mockReceipt 
    });
  } catch (error) {
    console.error('Error generating receipt:', error);
    res.status(500).json({ 
      success: false, 
      error: 'Failed to generate receipt' 
    });
  }
});

module.exports = router;