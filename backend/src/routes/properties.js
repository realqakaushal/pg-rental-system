const express = require('express');
const router = express.Router();
const Property = require('../models/Property');

router.get('/', async (req, res) => {
  try {
    const properties = await Property.findAll(req.query.owner_id);
    res.json({ success: true, data: properties });
  } catch (error) {
    console.error('Error fetching properties:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch properties' });
  }
});

router.get('/:id', async (req, res) => {
  try {
    const property = await Property.findById(req.params.id);
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.json({ success: true, data: property });
  } catch (error) {
    console.error('Error fetching property:', error);
    res.status(500).json({ success: false, error: 'Failed to fetch property' });
  }
});

router.post('/', async (req, res) => {
  try {
    const property = await Property.create(req.body);
    res.status(201).json({ success: true, data: property });
  } catch (error) {
    console.error('Error creating property:', error);
    res.status(500).json({ success: false, error: 'Failed to create property' });
  }
});

router.put('/:id', async (req, res) => {
  try {
    const property = await Property.update(req.params.id, req.body);
    if (!property) {
      return res.status(404).json({ success: false, error: 'Property not found' });
    }
    res.json({ success: true, data: property });
  } catch (error) {
    console.error('Error updating property:', error);
    res.status(500).json({ success: false, error: 'Failed to update property' });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    await Property.delete(req.params.id);
    res.json({ success: true, message: 'Property deleted successfully' });
  } catch (error) {
    console.error('Error deleting property:', error);
    res.status(500).json({ success: false, error: 'Failed to delete property' });
  }
});

module.exports = router;