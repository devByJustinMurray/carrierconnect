import express from 'express';
import Load from '../models/loadModel.js';

const router = express.Router();

// Create a load
router.post('/api/loads', async (req, res) => {
  try {
    const newLoad = new Load(req.body);
    const savedLoad = await newLoad.save();
    res.status(201).json(savedLoad);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// Get all loads
router.get('/api/loads', async (req, res) => {
  try {
    const loads = await Load.find();
    res.json(loads);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
