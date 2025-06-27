const express = require('express');
const router = express.Router();
const Application = require('../models/Application');
const { authenticate, authorize } = require('../middleware/auth');

// Submit a new application (public)
router.post('/', async (req, res) => {
  try {
    const application = await Application.create(req.body);
    res.status(201).json({
      success: true,
      data: application,
      message: 'Application submitted successfully'
    });
  } catch (error) {
    console.error('Error creating application:', error);
    res.status(500).json({ success: false, error: 'Failed to submit application' });
  }
});

// Get all applications (owner/admin only)
router.get('/', authenticate, authorize('owner', 'admin'), async (req, res) => {
  try {
    const applications = await Application.findAll(req.query);
    res.json({ success: true, data: applications });
  } catch (error) {
    console.error('Error fetching applications:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch applications' });
  }
});

// Get applications for a specific user (public - for demo)
router.get('/user/:userId', async (req, res) => {
  try {
    // For demo purposes, return mock data
    // In production, this would check authentication and fetch user's applications
    const mockApplications = [
      {
        id: 1,
        room_number: '101',
        property_name: 'Green Valley PG',
        city: 'Bangalore',
        status: 'approved',
        created_at: '2024-01-15T10:30:00Z',
        move_in_date: '2024-02-01',
        monthly_rent: 8000,
        security_deposit: 16000,
        application_data: {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+91 9876543210',
          occupation: 'Software Engineer',
          duration: '6 months'
        }
      },
      {
        id: 2,
        room_number: '203',
        property_name: 'Sunshine Residency',
        city: 'Bangalore',
        status: 'pending',
        created_at: '2024-01-20T14:45:00Z',
        move_in_date: '2024-02-15',
        monthly_rent: 10000,
        security_deposit: 20000,
        application_data: {
          fullName: 'John Doe',
          email: 'john.doe@example.com',
          phone: '+91 9876543210',
          occupation: 'Software Engineer',
          duration: '12 months'
        }
      }
    ];
    
    res.json({ success: true, data: mockApplications });
  } catch (error) {
    console.error('Error fetching user applications:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch user applications' });
  }
});

// Get applications for a specific room (owner/admin only)
router.get('/room/:roomId', authenticate, authorize('owner', 'admin'), async (req, res) => {
  try {
    const applications = await Application.findByRoom(req.params.roomId);
    res.json({ success: true, data: applications });
  } catch (error) {
    console.error('Error fetching room applications:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch room applications' });
  }
});

// Get a specific application (owner/admin only)
router.get('/:id', authenticate, authorize('owner', 'admin'), async (req, res) => {
  try {
    const application = await Application.findById(req.params.id);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    res.json({ success: true, data: application });
  } catch (error) {
    console.error('Error fetching application:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch application' });
  }
});

// Update application status (owner/admin only)
router.put('/:id/status', authenticate, authorize('owner', 'admin'), async (req, res) => {
  try {
    const { status, notes } = req.body;
    
    if (!['pending', 'approved', 'rejected', 'waitlisted'].includes(status)) {
      return res.status(400).json({ success: false, error: 'Invalid status' });
    }
    
    const application = await Application.updateStatus(req.params.id, status, notes);
    if (!application) {
      return res.status(404).json({ success: false, error: 'Application not found' });
    }
    
    res.json({ success: true, data: application });
  } catch (error) {
    console.error('Error updating application status:', error);
    res.status(500).json({ success: false, error: 'Failed to update application status' });
  }
});

// Delete an application (owner/admin only)
router.delete('/:id', authenticate, authorize('owner', 'admin'), async (req, res) => {
  try {
    await Application.delete(req.params.id);
    res.json({ success: true, message: 'Application deleted successfully' });
  } catch (error) {
    console.error('Error deleting application:', error);
    res.status(500).json({ success: false, error: 'Failed to delete application' });
  }
});

module.exports = router;