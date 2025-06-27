const express = require('express');
const router = express.Router();
const Room = require('../models/Room');

router.get('/', async (req, res) => {
  try {
    const rooms = await Room.findAll(req.query);
    res.json({ success: true, data: rooms });
  } catch (error) {
    console.error('Error fetching rooms:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch rooms', details: error.message });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const room = await Room.findById(req.params.id);
    if (!room) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }
    res.json({ success: true, data: room });
  } catch (error) {
    console.error('Error fetching room:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch room' });
  }
});

router.post('/', async (req, res) => {
  try {
    const room = await Room.create(req.body);
    res.status(201).json({ success: true, data: room });
  } catch (error) {
    console.error('Error creating room:', error);
    res.status(500).json({ success: false, error: 'Failed to create room' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const room = await Room.update(req.params.id, req.body);
    if (!room) {
      return res.status(404).json({ success: false, error: 'Room not found' });
    }
    res.json({ success: true, data: room });
  } catch (error) {
    console.error('Error updating room:', error);
    res.status(500).json({ success: false, error: 'Failed to update room' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Room.delete(req.params.id);
    res.json({ success: true, message: 'Room deleted successfully' });
  } catch (error) {
    console.error('Error deleting room:', error);
    res.status(500).json({ success: false, error: 'Failed to delete room' });
  }
});

module.exports = router;