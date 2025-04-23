const express = require('express');
const router = express.Router();
const Item = require('../models/Item');

// ✅ GET ALL ITEMS (this is what your homepage calls)
router.get('/', async (req, res) => {
  try {
    const items = await Item.find();
    res.json(items);
  } catch (err) {
    console.error('❌ Error fetching items:', err.message);
    res.status(500).json({ message: 'Failed to fetch items', error: err.message });
  }
});

// ✅ GET one item by ID
router.get('/:id', async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    if (!item) return res.status(404).json({ message: 'Item not found' });
    res.json(item);
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch item', error: err.message });
  }
});

// ✅ POST - Create item
router.post('/', async (req, res) => {
  const { name, description, language } = req.body;

  if (!name || !description || !language) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  try {
    const newItem = new Item({ name, description, language });
    const saved = await newItem.save();
    res.status(201).json(saved);
  } catch (err) {
    res.status(500).json({ message: 'Error saving item', error: err.message });
  }
});

// ✅ PUT - Update item
router.put('/:id', async (req, res) => {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: 'Item not found' });
    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: 'Update failed', error: err.message });
  }
});

// ✅ DELETE - Remove item
router.delete('/:id', async (req, res) => {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id);
    if (!deleted) return res.status(404).json({ message: 'Item not found' });
    res.json({ message: 'Item deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Delete failed', error: err.message });
  }
});

module.exports = router;
